'use client';

import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CardHeader, CardContent, Card } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import * as z from 'zod';
import { ApiResponse } from '@/types/ApiResponse';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { messageSchema } from '@/schemas/messageSchema';
import { Input } from '@/components/ui/input';

const specialChar = '||';

const parseStringMessages = (messageString: string): string[] => {
  return messageString.split(specialChar);
};

const initialMessageString =
  'You’ve got that cool vibe; people notice it! || A little boost in confidence could go a long way! || I love how you bring your ideas to life—keep it up!';

export default function SendMessage() {
  const params = useParams<{ username: string }>();
  const username = params.username;

  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
  });

  const messageContent = form.watch('content');

  const handleMessageClick = (message: string) => {
    form.setValue('content', message);
  };

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: z.infer<typeof messageSchema>) => {
    setIsLoading(true);
    try {
      const response = await axios.post<ApiResponse>('/api/send-message', {
        ...data,
        username,
      });

      toast({
        title: response.data.message,
        variant: 'default',
      });
      form.reset({ ...form.getValues(), content: '' });
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: 'Error',
        description:
          axiosError.response?.data.message ?? 'Failed to send message',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const [messages, setMessages] = useState<string>(initialMessageString);
  const [topic, setTopic] = useState<string>('');
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);

  const fetchSuggestedMessages = async () => {
    setIsLoadingSuggestions(true);
    try {
      const response = await axios.post<ApiResponse>('/api/suggest-messages', {
        topic: topic,
      });
      //console.log(response.data.message);
      
      setMessages(response.data.message || initialMessageString); // Ensure fallback to prevent undefined messages
      toast({
        title: 'Suggested messages updated',
        variant: 'default',
      });
    } catch (error) {
      toast({
        title: 'Error fetching messages',
        variant: 'destructive',
      });
    } finally {
      setIsLoadingSuggestions(false);
    }
  };

  return (
    <div className="container mx-auto my-3 p-6 bg-background rounded max-w-4xl">
      <h1 className="text-2xl sm:text-4xl font-bold mb-8 text-center">
        Send Anonymous Messages to{' '}
        <span className="text-primary border-b-2 border-primary ">
          {username}
        </span>
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="Write your anonymous message here"
                    className="resize-none bg-input font-mono"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-center">
            {isLoading ? (
              <Button disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button type="submit" disabled={isLoading || !messageContent}>
                Send It
              </Button>
            )}
          </div>
        </form>
      </Form>

      <Separator className="my-6" />

      <div className="space-y-4 my-8">
        <div className="space-y-2">
          <h3 className="text-md font-semibold">
            Topic for message suggestion:
          </h3>
          <div className="flex gap-5">
            <Input
              className="bg-input"
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Enter topic"
            />
            <Button onClick={fetchSuggestedMessages}>
              {isLoadingSuggestions ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                'Suggest'
              )}
            </Button>
          </div>
        </div>
        <p>Click on any message below to select it.</p>
        <Card className="pt-5 bg-card shadow-2xl">
          {isLoadingSuggestions ? (
            <div className="flex justify-center items-center p-20">
              <Loader2 className="h-10 w-10 animate-spin" />
            </div>
          ) : (
            <CardContent className="flex flex-col space-y-4">
              {parseStringMessages(messages).map((message, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="mb-2 text-wrap min-h-fit bg-accent font-mono"
                  onClick={() => handleMessageClick(message)}
                >
                  {message}
                </Button>
              ))}
            </CardContent>
          )}
        </Card>
      </div>
      <Separator className="my-6" />
      <div className="text-center">
        <div className="mb-4">Get Your Message Board</div>
        <Link href={'/sign-up'}>
          <Button>Create Your Account</Button>
        </Link>
      </div>
    </div>
  );
}
