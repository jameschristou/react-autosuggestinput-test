import './sass/autoSuggestInput.scss';

import React, {useState, useRef, useEffect} from "react";

const ReactAutoSuggestInput = ({items, filterOptionsHandler}) => {
  const itemsContainer = useRef();
  const [id, setId] = useState(null);

  useEffect(() => {
    console.log('useEffect:AutoSuggestInput');

    if(id == null){
      setId(generateRandomId());
    }
  });

  const generateRandomId = () => {
    // generates a random 5 digit id which should be enough to prevent conflict between many instances of 
    // this component on the one page
    return Math.floor(Math.random()*10000);
  }

  return (
    <div className="autoSuggestInput" id={`autoSuggestInput-${id}`}>
      <div ref={itemsContainer} className="autoSuggestInput__items autoSuggestInput__items-active" onClick={evnt => toggleAddNewItemClickHandler(evnt)} >
        <SearchInput filterOptionsHandler={filterOptionsHandler} selectedItems={items} shouldShow={true} id={id}/>
      </div>
    </div>
  );
}

const SearchInput = ({filterOptionsHandler, shouldShow, id}) => {
  const txtBoxRef = useRef(null);
  const newItemRef = useRef(null);
  const idRef = useRef(id);
  const [parentHeight, setParentHeight] = useState(0);
  const [parentWidth, setParentWidth] = useState(0);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    txtBoxRef.current.focus();

    setParentHeight(txtBoxRef.current.clientHeight);
    setParentWidth(txtBoxRef.current.clientWidth);

    if(id != null){
      idRef.current = id;
    }
  }, [txtBoxRef, shouldShow]);

  const searchUpdatedEventHandler = async (evnt) => {
    filterOptionsHandler(evnt.target.textContent.trim(), setSuggestions);
  }

  return (
    <div ref={newItemRef} id={`autoSuggestInputNewItem-${id}`} className="autoSuggestInputNewItem" style={{width:parentWidth, height:parentHeight}}>
      <div className="autoSuggestInputNewItem__container">
        <div ref={txtBoxRef} className="autoSuggestInputNewItem__text" contentEditable="true" onClick={evnt => evnt.stopPropagation()} onInput={evnt => searchUpdatedEventHandler(evnt)}></div>
        <ul className="autoSuggestInputNewItem__list">
          {suggestions.map(
            (item, index) => {
              return (
                <li key={index} className="autoSuggestInputNewItem__listitem">{item}</li>
              );
            }
          )}
        </ul>
      </div>
    </div>
  );
}

export default ReactAutoSuggestInput;