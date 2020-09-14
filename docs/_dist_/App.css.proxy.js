const code=`
.grid {

  display: flex;
  flex-wrap: wrap;
}

.grid .grid__tile {
  box-sizing: border-box;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 33%;
  height: 60px;


  background-color: green;
  
}`,styleEl=document.createElement("style"),codeEl=document.createTextNode(code);styleEl.type="text/css",styleEl.appendChild(codeEl),document.head.appendChild(styleEl);
