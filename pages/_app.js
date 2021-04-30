import Link from "next/link";
import dynamic from "next/dynamic";

import {EditProvider, setEditing, useEditState} from '../utils/editState'

function InnerApp({ Component, pageProps }) {
  const {edit} = useEditState()
  if (edit) {
    const TinaWrapper = dynamic(() => import("../components/tina-wrapper"));
    return (
      <>
        <TinaWrapper {...pageProps}>
          {(props) => <Component {...props} />}
        </TinaWrapper>
        <EditToggle isInEditMode={true} />
      </>
    );
  }
  return (
    <>
      <Component {...pageProps} />
      <EditToggle isInEditMode={true} />
    </>
  );
}


const EditToggle = (isInEditMode) => {
  const {edit,setEdit} = useEditState()
  return (
    <>
      <button onClick={()=>{
        setEdit(!edit)
      }}>
        <a className="editLink">
          {edit ? "Exit edit mode" : "Enter edit mode"}
        </a>
      </button>
      <style jsx>{`
        .editLink {
          position: fixed;
          top: 0;
          right: 0;
          background: var(--orange);
          color: var(--white);
          padding: 0.5rem 0.75rem;
          font-weight: bold;
          text-decoration: none;
          display: inline-block;
          border-bottom-left-radius: 0.5rem;
          cursor: pointer;
        }
      `}</style>
    </>
  );
};


function App(props) {
  return (<EditProvider>
    <InnerApp {...props}/>
  </EditProvider>)
}

export default App