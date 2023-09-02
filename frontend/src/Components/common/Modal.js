import React, { useState } from 'react';

const withModal=(ModalComponent=>(WrapperComponent)=>{
  return function(props){
   const [isModal ,setModal]=useState(false)
   return (
     <>
      {isModal && <ModalComponent toggleModal={setModal} />}
      <WrapperComponent toggleModal={setModal} {...props}/>
     </>
   )
   }

})
export default withModal