import dbConnect from '@/lib/dbConnect';
import UserModel from '@/model/User';
import mongoose from 'mongoose';
import { User } from 'next-auth';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/options';
import { NextRequest } from 'next/server';

export async function DELETE(request: NextRequest,
  { params }: { params: Promise<any> })
{
  const { messageid } = await params;
  await dbConnect();
  const session = await getServerSession(authOptions);
  const _user: User = session?.user as User

  if (!session || !_user) {
    return Response.json(
      { success: false, message: 'Not authenticated' },
      { status: 401 }
    );
  }
  const userId = new mongoose.Types.ObjectId(_user._id);
  try {
    const updatedResult = await UserModel.updateOne(
      {_id: userId},
      {$pull: {messages: {_id: messageid}}}
    )
    if(updatedResult.modifiedCount == 0){
      return Response.json(
        { success: false, message: 'Message not found or already deleted' },
        { status: 404 }
      );
    }
    return Response.json(
      { success: true, message: 'Message deleted' },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error in delete message route", error);
    
    return Response.json(
      { success: false, message: 'Error deleting message' },
      { status: 500 }
    );
  }
  
}