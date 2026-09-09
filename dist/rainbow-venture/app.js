const toast=document.querySelector('[role="status"]');let timer;function notify(message){if(!toast)return;toast.textContent=message;clearTimeout(timer);timer=setTimeout(()=>toast.textContent='',3500)}document.querySelectorAll('[data-copy]').forEach(button=>button.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(button.dataset.copy);notify('Copied '+button.dataset.copy)}catch{notify(button.dataset.copy)}}));document.querySelectorAll('[data-jump]').forEach(button=>button.addEventListener('click',()=>document.querySelector(button.dataset.jump)?.scrollIntoView({behavior:'smooth'})));document.querySelector('#application-form').addEventListener('submit',event=>{event.preventDefault();const form=new FormData(event.currentTarget);const text=`Introduction to Bird

Name: ${form.get('name')}
Email: ${form.get('email')}

What I am building:
${form.get('idea')}
`;const url=URL.createObjectURL(new Blob([text],{type:'text/plain'}));const a=document.createElement('a');a.href=url;a.download='founder-introduction.txt';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);notify('Your introduction was downloaded. Nothing was sent.');});document.querySelector('[data-year]').textContent=new Date().getFullYear();