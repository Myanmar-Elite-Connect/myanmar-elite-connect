(function(){
  'use strict';
  if(!/add-listing\.html$/i.test(location.pathname)) return;
  const sleep=ms=>new Promise(r=>setTimeout(r,ms));
  const $=id=>document.getElementById(id);
  const db=()=>window.supabaseClient;
  const css=`
    #mecExtraFields{margin-top:25px;padding-top:25px;border-top:1px solid var(--border);display:grid;gap:14px}
    #mecExtraFields .mec-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px}
    #mecExtraFields .mec-field.full{grid-column:1/-1}
    #mecExtraFields label{display:block;margin-bottom:7px;font-size:10px;font-weight:900}
    #mecExtraFields textarea{min-height:105px}
    #category{font-weight:800}
    @media(max-width:600px){#mecExtraFields .mec-grid{grid-template-columns:1fr}#mecExtraFields .mec-field.full{grid-column:auto}}
  `;
  function addStyles(){if($('mec-add-fix-style'))return;const s=document.createElement('style');s.id='mec-add-fix-style';s.textContent=css;document.head.appendChild(s)}
  function injectFields(){
    const cat=$('category'); if(!cat)return;
    cat.innerHTML=`<option value="">Select destination</option><option value="car">Car</option><option value="property">Property</option><option value="gem">Gem</option><option value="allmarket">All Market</option>`;
    const label=cat.closest('.field')?.querySelector('label');if(label)label.innerHTML='Post destination <span class="required">*</span>';
    if($('mecExtraFields'))return;
    const desc=$('description');if(!desc)return;
    const section=document.createElement('div');section.id='mecExtraFields';
    section.innerHTML=`
      <div class="section-head"><div class="section-title">Listing Details</div><div class="section-note">Required for buyers</div></div>
      <div class="mec-grid">
        <div class="mec-field full"><label>Item Name <span class="required">*</span></label><input id="mecItemName" maxlength="160" placeholder="e.g. Toyota Alphard 2018"></div>
        <div class="mec-field full"><label>Details</label><textarea id="mecDetails" maxlength="3000" placeholder="Model, year, specifications, included items and other details..."></textarea></div>
        <div class="mec-field full"><label>Weaknesses / Damaged Parts</label><textarea id="mecWeaknesses" maxlength="2000" placeholder="Describe scratches, damaged parts, repairs needed, or write None."></textarea></div>
        <div class="mec-field"><label>Contact Phone <span class="required">*</span></label><input id="mecPhone" type="tel" maxlength="40" placeholder="09xxxxxxxxx"></div>
        <div class="mec-field"><label>Contact Address</label><input id="mecContactAddress" maxlength="220" placeholder="Address for contact / meeting"></div>
      </div>`;
    desc.closest('.section')?.after(section);
  }
  function validate(){
    const required=[[$('title')?.value.trim(),'Please enter a title.'],[$('category')?.value,'Please select where this post should appear.'],[$('price')?.value,'Please enter the price.'],[$('region')?.value.trim(),'Please enter Region / State.'],[$('mecItemName')?.value.trim(),'Please enter the item name.'],[$('mecPhone')?.value.trim(),'Please enter a contact phone number.']];
    for(const [v,m] of required)if(!v)return {ok:false,message:m};
    if(!window.__mecSelectedFiles?.length)return {ok:false,message:'Please select at least one photo.'};
    return {ok:true};
  }
  async function upload(userId,file,i){
    const ext=(file.name.split('.').pop()||'jpg').toLowerCase().replace(/[^a-z0-9]/g,'')||'jpg';
    const path=userId+'/'+Date.now()+'-'+i+'-'+crypto.randomUUID()+'.'+ext;
    const r=await db().storage.from('listing-images').upload(path,file,{cacheControl:'3600',upsert:false,contentType:file.type});
    if(r.error)throw r.error;
    return db().storage.from('listing-images').getPublicUrl(path).data.publicUrl;
  }
  async function publish(e){
    e.preventDefault();e.stopImmediatePropagation();
    const btn=$('publishButton');if(!btn)return false;
    const v=validate();if(!v.ok){window.setStatus?.(v.message,'error');alert(v.message);return false}
    const {data:ud,error:ue}=await db().auth.getUser();if(ue||!ud?.user){location.href='./auth.html?mode=login';return false}
    const user=ud.user;btn.disabled=true;btn.textContent='Uploading photos...';
    try{
      const urls=[];for(let i=0;i<window.__mecSelectedFiles.length;i++){window.setStatus?.(`Uploading photo ${i+1} of ${window.__mecSelectedFiles.length}...`,'loading');urls.push(await upload(user.id,window.__mecSelectedFiles[i],i))}
      const category=$('category').value;
      const payload={
        user_id:user.id,seller_id:user.id,listing_type:'sale',post_role:'seller',
        category,market_category:category,title:$('title').value.trim(),item_name:$('mecItemName').value.trim(),
        description:$('description').value.trim()||null,details:$('mecDetails').value.trim()||null,
        weaknesses:$('mecWeaknesses').value.trim()||null,price:Number($('price').value),currency:'MMK',
        condition:$('condition').value||null,region:$('region').value.trim()||null,township:$('township').value.trim()||null,
        nearby_address:$('nearbyAddress').value.trim()||null,location:[$('region').value.trim(),$('township').value.trim(),$('nearbyAddress').value.trim()].filter(Boolean).join(' · ')||null,
        address:$('mecContactAddress').value.trim()||null,phone:$('mecPhone').value.trim(),
        show_photo_url:urls[0]||null,images:urls,detail_images:urls.slice(1),status:'pending',featured:false
      };
      btn.textContent='Submitting for approval...';window.setStatus?.('Saving listing for admin approval...','loading');
      const r=await db().from('listings').insert(payload).select('id').single();if(r.error)throw r.error;
      window.setStatus?.('Submitted successfully. Your listing is waiting for admin approval.','success');btn.textContent='Submitted ✓';
      setTimeout(()=>location.href='./profile.html',900);
    }catch(err){console.error(err);window.setStatus?.('Unable to submit: '+(err.message||'Unknown error'),'error');alert('Unable to submit listing:\n'+(err.message||'Unknown error'));btn.disabled=false;btn.textContent='Publish Listing'}
    return false;
  }
  async function boot(){
    addStyles();injectFields();
    const input=$('photoInput');if(input){window.__mecSelectedFiles=[];input.addEventListener('change',()=>{window.__mecSelectedFiles=Array.from(input.files||[]).slice(0,10);},true)}
    const btn=$('publishButton');if(btn)btn.addEventListener('click',publish,true);
    await sleep(200);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
