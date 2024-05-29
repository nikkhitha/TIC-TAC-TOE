let boxes=document.querySelectorAll(".box")
let resetbutton=document.querySelector("#reset")
let newbutton=document.querySelector("#newbutton")
let msgcontainer=document.querySelector(".msgcontainer")
let msg=document.querySelector(".msg")
let turnO=true;
let count=0;
let winningpatterns=[[0,4,8],
                     [2,4,6],
                     [0,3,6],
                     [1,4,7],
                     [2,5,8],
                     [0,1,2],
                     [3,4,5],
                     [6,7,8]];
const resetGame=()=>{
    turnO=true;
    count=0;
    enableBoxes();
    msgcontainer.classList.add("hide");
    removeColorClasses();
}
boxes.forEach((box)=>{
    box.addEventListener(("click"),()=>{
        if(turnO){
            box.innerText="O";
            box.classList.add("O");
            turnO=false;
        }
        else{
            box.innerText="X";
            box.classList.add("X");
            turnO=true;
        }
        box.disabled=true;/*after clicking on specific box box should be disabled */
        count++;
        let isWinner = checkWinner();
        if(count===9 && !isWinner){
            gameDraw();
        }
        
    });
    
});
const checkWinner=()=>{
    for(pattern of winningpatterns){
        let pos1=boxes[pattern[0]].innerText;
        let pos2=boxes[pattern[1]].innerText;
        let pos3=boxes[pattern[2]].innerText;
        if(pos1!="" && pos2!="" && pos3!=""){
            if(pos1==pos2 && pos2==pos3){
                showWinner(pos1);
                return true;
            }
        }
    }
    return false;
};
const showWinner=(winner)=>{
    msg.innerText=`Congratulations Winner is ${winner}`;
    msgcontainer.classList.remove("hide");
    disableBoxes();
}
const disableBoxes=()=>{
    for(let box of boxes){
        box.disabled=true;
    }
}
const enableBoxes=()=>{
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";
    }
}
const removeColorClasses = () => {
    for (let box of boxes) {
        box.classList.remove("O", "X");
    }
};
const gameDraw=()=>{
    msg.innerText=" Oops! Game was a Draw";
    msgcontainer.classList.remove("hide");
    disableBoxes();
}

newbutton.addEventListener("click",resetGame);
resetbutton.addEventListener("click",resetGame);