import React from 'react';

const Card = ({ children }: { children: React.ReactNode }) => {
  return (
<div className="flex items-center justify-center h-[80vh]">
  <div className="bg-zinc-800 max-w-md max-h-[90vh] p-10 rounded-md ">
    {children}
  </div>
</div>

  
  );
};

export default Card;

