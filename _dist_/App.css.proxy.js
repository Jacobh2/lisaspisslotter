const code=`body {
  user-select: none;
  background-color: rgb(237 223 1);
}

.grid {

  display: flex;
  flex-direction: column;

  justify-items: center;
  align-items: center;
  position: relative;
}

.grid__overlay {
  pointer-events: none;
  z-index: 1;

  position: absolute;
  top: 0;
  width: 310px;
  height: 454px;

  background-repeat: no-repeat;
}

.grid__frame {
  padding-top: 103px;
}

.grid__row {
  overflow: hidden;

  display: flex;
}

.grid__row__special-tile {
  display: flex;
  align-items: center;
  justify-content: flex-end;

  height: 70px;
  width: 100%;
}

.grid__tile {
  position: relative;
  box-sizing: border-box;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 82px;
  height: 66px;

  background-color: rgb(234 229 138 / 1);
}

.grid__tile__content {
  pointer-events: none;
}

.grid__tile canvas {
  position: absolute;
  top: 0;
  left: 0;
}

.grid__tile--revealed {
  background-color: rgb(234 229 138 / 1);
}

.grid__tile--revealed canvas {
  display: none;
}`,styleEl=document.createElement("style"),codeEl=document.createTextNode(code);styleEl.type="text/css",styleEl.appendChild(codeEl),document.head.appendChild(styleEl);
