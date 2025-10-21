function qs(id){return document.getElementById(id)}
function formatBytes(n){if(n===0)return '0 B';const k=1024;const sizes=['B','KB','MB','GB'];const i=Math.floor(Math.log(n)/Math.log(k));return `${(n/Math.pow(k,i)).toFixed(2)} ${sizes[i]}`}

const dropzone=qs('dropzone');
const input=qs('file-input');
const btn=qs('optimize-btn');
const spinner=qs('spinner');
const result=qs('result');
const orig=qs('orig-bytes');
const opt=qs('opt-bytes');
const saved=qs('saved');
const download=qs('download-link');
const rzpBtn=qs('rzp-btn');
let razorpayKeyId='';

function setLoading(v){spinner.classList.toggle('hidden',!v);btn.disabled=!!v}

dropzone.addEventListener('click',()=>input.click());
dropzone.addEventListener('dragover',(e)=>{e.preventDefault();dropzone.classList.add('dragover')});
dropzone.addEventListener('dragleave',()=>dropzone.classList.remove('dragover'));
dropzone.addEventListener('drop',(e)=>{e.preventDefault();dropzone.classList.remove('dragover');if(e.dataTransfer.files&&e.dataTransfer.files[0]){input.files=e.dataTransfer.files}});

btn.addEventListener('click',async()=>{
  if(!input.files||!input.files[0]){alert('Please choose an .svg file.');return}
  const file=input.files[0];
  if(!/\.svg$/i.test(file.name)){alert('Only .svg files are allowed.');return}
  const fd=new FormData();
  fd.append('file',file);
  setLoading(true);
  try{
    const res=await fetch('/api/optimize-svg',{method:'POST',body:fd});
    const data=await res.json();
    if(!res.ok) throw new Error(data.error||'Failed');
    orig.textContent=formatBytes(data.originalBytes);
    opt.textContent=formatBytes(data.optimizedBytes);
    const diff=data.originalBytes-data.optimizedBytes;saved.textContent=`${formatBytes(diff)} (${data.percentSaved}%)`;
    download.href=data.downloadUrl;
    result.classList.remove('hidden');
  }catch(err){alert(err.message||'Something went wrong');}
  finally{setLoading(false)}
});

rzpBtn.addEventListener('click',async()=>{
  try{
    if(!razorpayKeyId){
      const cfg=await fetch('/api/public-config').then(r=>r.json());
      razorpayKeyId=cfg.razorpayKeyId||'';
    }
    const res=await fetch('/api/create-order',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({amount:4900,currency:'INR'})});
    const {orderId,amount,currency}=await res.json();
    const options={
      key: razorpayKeyId,
      amount, currency,
      name:'SVG Optimizer', description:'Support contribution', order_id:orderId,
      handler:function(){ alert('Thank you for your support!'); },
      theme:{ color:'#2563eb' }
    };
    const rzp=new window.Razorpay(options);
    rzp.open();
  }catch(err){alert(err.message||'Failed to start payment')}
});


