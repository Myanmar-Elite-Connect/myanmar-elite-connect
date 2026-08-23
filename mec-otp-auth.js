/* Myanmar Elite Connect — secure Supabase email OTP signup bridge. */
(function(){
  if(location.pathname.split('/').pop()!=='auth.html') return;
  const client=window.supabaseClient||window.supabase;
  document.addEventListener('submit',async function(event){
    const form=event.target;
    if(!form || !/signup/i.test(form.id||'')) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    const email=form.querySelector('input[type="email"]')?.value.trim();
    const passwords=[...form.querySelectorAll('input[type="password"]')];
    const password=passwords[0]?.value||'';
    const confirm=passwords[1]?.value||password;
    const button=form.querySelector('button[type="submit"]');
    const message=form.querySelector('.message');
    const show=(text,type='')=>{if(message){message.textContent=text;message.className='message '+type}};
    if(!email||!password){show('Please enter your email and password.','error');return;}
    if(password!==confirm){show('Passwords do not match.','error');return;}
    if(!client?.auth){show('Supabase client is not available.','error');return;}
    if(button) button.disabled=true;
    show('Creating your account and sending OTP…');
    try{
      const {error}=await client.auth.signUp({email,password});
      if(error) throw error;
      sessionStorage.setItem('mec_verify_email',email);
      location.href='./verify.html';
    }catch(error){
      show(error?.message||'Unable to create account.','error');
      if(button) button.disabled=false;
    }
  },true);
})();