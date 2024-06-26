"use client"
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { twMerge } from 'tailwind-merge';

interface CustomDialogTriggerProps {
  header?: string;
  content?: React.ReactNode;
  children: React.ReactNode;
  description?: string;
  className?: string;
}

const CustomDialogTrigger: React.FC<CustomDialogTriggerProps> = ({
  header,
  content,
  children,
  description,
  className,
}) => {
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className={twMerge("block bg-white text-black min-h-[250px] max-h-full xl:w-[35%] md:w-[50%] sm:w-[70%] w-[90%] overflow-scroll hidescrollbar rounded-lg transition-all duration-500", className)} >
        <DialogHeader className=' w-max'>
          <DialogTitle className='text-[1.5em]'>{header}</DialogTitle>
          <DialogDescription className='text-[0.8em] w-max'>{description}</DialogDescription>
        </DialogHeader>
        {content}
      </DialogContent>
    </Dialog>
  );
};

export default CustomDialogTrigger;
