const screens=[...document.querySelectorAll(".screen")];
const toast=document.getElementById("toast");
const modal=document.getElementById("consent-modal");
let currentGeneralGift="outfit";

const giftMeta={
  outfit:{
    company:"아웃핏코드",
    formTitle:"스타일링 안내를 받을<br />정보를 확인해주세요.",
    formLead:"예약 및 프로그램 안내에 필요한 최소 정보를 전달합니다.",
    notice:"스타일링 범위, 예약 방식, 추가 결제 여부 등은 업체 확인 후 상세페이지에 최종 반영됩니다.",
    completeLead:"아웃핏코드에서 예약 및 이용 방법을 안내드릴 예정이에요.",
    completeStrong:"신청이 완료됐어요.",
    completeText:"실제 스타일링 일정과 포함 범위는 아웃핏코드 안내를 통해 확정됩니다.",
    flow:[
      ["안내 연락","아웃핏코드에서 예약 방법과 프로그램을 안내해요."],
      ["일정 확인","가능한 일정과 진행 방식을 확인해요."],
      ["스타일링 이용","예약한 일정에 맞춰 서비스를 이용해요."]
    ]
  },
  care:{
    company:"OO케어",
    formTitle:"케어 이용 안내를 받을<br />정보를 확인해주세요.",
    formLead:"예약 및 이용 가능한 지점 안내에 필요한 최소 정보를 전달합니다.",
    notice:"무료 관리 범위, 지점, 추가비용 및 현장 권유 여부는 업체 확인 후 최종 반영됩니다.",
    completeLead:"OO케어에서 예약 및 이용 방법을 안내드릴 예정이에요.",
    completeStrong:"케어 웰컴기프트 신청이 완료됐어요.",
    completeText:"실제 관리 종류와 예약 일정은 OO케어 안내를 통해 확정됩니다.",
    flow:[
      ["이용 안내","OO케어에서 이용 가능한 지점과 프로그램을 안내해요."],
      ["예약","원하는 일정과 지점을 확인해 예약해요."],
      ["케어 이용","무료 제공 범위를 확인하고 서비스를 이용해요."]
    ]
  }
};

function showScreen(name){
  screens.forEach(s=>s.classList.toggle("is-active",s.dataset.screen===name));
  window.scrollTo({top:0,behavior:"instant"});
}
function showToast(msg){
  toast.textContent=msg; toast.classList.add("is-show");
  clearTimeout(showToast.timer);
  showToast.timer=setTimeout(()=>toast.classList.remove("is-show"),2200);
}
document.querySelectorAll("[data-back]").forEach(b=>b.addEventListener("click",()=>showScreen(b.dataset.back)));
document.querySelectorAll("[data-next]").forEach(b=>b.addEventListener("click",()=>showScreen(b.dataset.next)));
document.querySelectorAll("[data-open-detail]").forEach(b=>{
  b.addEventListener("click",()=>showScreen(`detail-${b.dataset.openDetail}`));
});
document.querySelectorAll(".accordion-item").forEach(item=>{
  item.addEventListener("click",()=>{
    const group=item.closest(".accordion");
    const panel=item.nextElementSibling;
    const open=item.classList.contains("is-open");
    group.querySelectorAll(".accordion-item").forEach(x=>{x.classList.remove("is-open");x.querySelector("b").textContent="＋"});
    group.querySelectorAll(".accordion-panel").forEach(x=>x.classList.remove("is-open"));
    if(!open){item.classList.add("is-open");item.querySelector("b").textContent="−";panel.classList.add("is-open")}
  });
});

document.querySelectorAll("[data-general-apply]").forEach(button=>{
  button.addEventListener("click",()=>{
    currentGeneralGift=button.dataset.generalApply;
    const meta=giftMeta[currentGeneralGift];
    document.getElementById("general-company").textContent=meta.company;
    document.getElementById("general-form-title").innerHTML=meta.formTitle;
    document.getElementById("general-form-lead").textContent=meta.formLead;
    document.getElementById("general-notice").textContent=meta.notice;
    document.querySelectorAll(".conditional-field").forEach(el=>el.classList.toggle("is-show",el.dataset.for===currentGeneralGift));
    showScreen("apply-general");
  });
});
document.getElementById("general-back").addEventListener("click",()=>showScreen(`detail-${currentGeneralGift}`));
document.getElementById("general-submit").addEventListener("click",()=>{
  const name=document.getElementById("general-name").value.trim();
  const phone=document.getElementById("general-phone").value.trim();
  if(!name||!phone){showToast("이름과 연락처를 확인해주세요.");return}
  if(!document.getElementById("general-consent").checked){showToast("필수 동의 항목을 확인해주세요.");return}
  setComplete(currentGeneralGift);
  showScreen("complete");
});

document.getElementById("to-survey").addEventListener("click",()=>{
  const required=[...document.querySelectorAll("#delivery-form input[required]")];
  if(required.some(i=>!i.value.trim())){showToast("배송 정보를 모두 확인해주세요.");return}
  showScreen("apply-onyou-2");
});
document.getElementById("submit-onyou").addEventListener("click",()=>{
  const form=document.getElementById("survey-form");
  const qs=["q1","q2","q3","q4"];
  const missing=qs.find(q=>!form.querySelector(`input[name="${q}"]:checked`));
  if(missing){showToast("모든 질문에 답변해주세요.");return}
  if(!document.getElementById("consent").checked){showToast("필수 동의 항목을 확인해주세요.");return}
  setComplete("onyou"); showScreen("complete");
});

function setComplete(type){
  const title=document.getElementById("complete-title");
  const lead=document.getElementById("complete-lead");
  const notice=document.getElementById("complete-notice");
  const flow=document.getElementById("complete-flow");

  if(type==="onyou"){
    title.innerHTML="웰컴기프트 신청이<br />완료됐어요.";
    lead.textContent="온유상조에서 안내 지류를 보내드릴 예정이에요.";
    notice.innerHTML="<strong>아직 온유상조에 가입된 것은 아니에요.</strong><p>지류 내용을 확인한 뒤 실제 가입 여부는 직접 결정할 수 있습니다.</p>";
    flow.innerHTML=[
      ["지류 발송","온유상조에서 등록된 주소로 발송해요."],
      ["지류 수령","혜택과 이용 방법을 확인해보세요."],
      ["가입 여부 결정","필요하다고 판단될 때 직접 선택할 수 있어요."]
    ].map((x,i)=>`<article><span>${i+1}</span><div><strong>${x[0]}</strong><p>${x[1]}</p></div></article>`).join("");
    return;
  }
  const meta=giftMeta[type];
  title.innerHTML="웰컴기프트 신청이<br />완료됐어요.";
  lead.textContent=meta.completeLead;
  notice.innerHTML=`<strong>${meta.completeStrong}</strong><p>${meta.completeText}</p>`;
  flow.innerHTML=meta.flow.map((x,i)=>`<article><span>${i+1}</span><div><strong>${x[0]}</strong><p>${x[1]}</p></div></article>`).join("");
}

document.getElementById("restart").addEventListener("click",()=>showScreen("gift"));
document.getElementById("consent-detail").addEventListener("click",()=>{modal.classList.add("is-open");modal.setAttribute("aria-hidden","false")});
document.querySelectorAll("[data-close-modal]").forEach(el=>el.addEventListener("click",()=>{modal.classList.remove("is-open");modal.setAttribute("aria-hidden","true")}));
