const form=document.getElementById('tripForm');
const list=document.getElementById('tripList');
const count=document.getElementById('tripCount');
const storageKey='cloudtrip-plans-v1';
let trips=[];
try{trips=JSON.parse(localStorage.getItem(storageKey)||'[]');if(!Array.isArray(trips))trips=[]}catch{trips=[]}
function save(){try{localStorage.setItem(storageKey,JSON.stringify(trips))}catch{alert('Could not save trips in this browser.')}render()}
function render(){count.textContent=trips.length;list.replaceChildren();if(!trips.length){const p=document.createElement('p');p.className='empty';p.textContent='No trips yet. Add your first destination above.';list.append(p);return}
trips.forEach((trip,index)=>{const card=document.createElement('article');card.className='trip-card';const details=document.createElement('div');const h=document.createElement('h3');h.textContent=trip.destination;const date=document.createElement('p');date.textContent='Travel date: '+trip.date;details.append(h,date);const remove=document.createElement('button');remove.className='remove';remove.textContent='Remove';remove.setAttribute('aria-label','Remove '+trip.destination);remove.addEventListener('click',()=>{trips.splice(index,1);save()});card.append(details,remove);list.append(card)})}
form.addEventListener('submit',event=>{event.preventDefault();const destination=document.getElementById('destination').value.trim();const date=document.getElementById('date').value;if(!destination||!date)return;trips.push({destination,date});save();form.reset()});
document.querySelectorAll('[data-place]').forEach(button=>button.addEventListener('click',()=>{document.getElementById('destination').value=button.dataset.place;document.getElementById('planner').scrollIntoView({behavior:'smooth'});document.getElementById('date').focus()}));
document.getElementById('clearTrips').addEventListener('click',()=>{if(trips.length&&confirm('Remove all saved trips?')){trips=[];save()}});
render();