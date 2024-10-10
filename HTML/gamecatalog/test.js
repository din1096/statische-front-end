var namen = ['ogualcan', 'dinho', 'sean', 'kahlid'];
let container = document.getElementById('namenContainer');


for(let i= 0; i<namen.length; i++){
    console.log('namen[i]');
   var button = document.createElement('button');
   button.innerText = namen[i];
   button,addEventListener('click', buttonclicked)
   

   container.appendChild(button);

}
function buttonclicked(e){
    alert(e.target.innerText + 'clicked a button');
    e.target.remove();
}