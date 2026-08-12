    const screens=[...document.querySelectorAll('.screen')];
    const toast=document.getElementById('toast');
    const modal=document.getElementById('consent-modal');
    let currentGeneralGift='outfit';
    const OUTFIT_FORM_URL=''; // 시놀 전용 구글폼 확정 후 URL 입력

    const giftMeta={
      outfit:{
        company:'아웃핏코드',
        formTitle:'웰컴기프트 신청 정보를<br />확인해주세요.',
        formLead:'시놀에서 혜택 신청을 완료한 뒤 아웃핏코드 구글폼에서 사진과 분석 정보를 입력합니다.',
        notice:'리포트 제작에 필요한 상세정보와 얼굴·체형 사진은 다음 단계의 아웃핏코드 구글폼에서 직접 입력합니다.',
        completeLead:'이제 아웃핏코드 신청서를 작성하면 리포트 제작 접수가 완료돼요.',
        completeStrong:'시놀 웰컴기프트 신청이 완료됐어요.',
        completeText:'아웃핏코드 구글폼에서 필요한 정보와 사진 업로드까지 완료해주세요.',
        flow:[
          ['신청서 작성','구글폼에서 이름·성별·나이·키·몸무게 등 필요한 정보를 입력해요.'],
          ['사진 2장 업로드','촬영 가이드에 맞춰 얼굴 정면 사진과 체형 정면 사진을 각각 1장씩 올려요.'],
          ['리포트 수령','신청 완료 후 약 1주 이내 입력한 이메일로 맞춤 스타일링 리포트가 발송돼요.']
        ]
      },
      care:{
        company:'대웅 케어허브',
        formTitle:'검사 예약 안내를 받을<br />정보를 확인해주세요.',
        formLead:'하남 케어허브 방문 예약에 필요한 최소 정보를 전달합니다.',
        notice:'인지기능·움직임 기능 검사의 세부 항목, 예약 가능 시간, 결과 안내 범위는 제휴 운영안 확정 후 최종 반영됩니다.',
        completeLead:'대웅 케어허브에서 검사 예약 방법을 안내드릴 예정이에요.',
        completeStrong:'건강검사 웰컴기프트 신청이 완료됐어요.',
        completeText:'예약 후 하남 케어허브에서 인지기능과 움직임 기능을 약 2시간 동안 점검하게 됩니다.',
        flow:[
          ['예약 안내','케어허브에서 방문 가능한 일정과 준비사항을 안내해요.'],
          ['하남 케어허브 방문','예약한 일정에 맞춰 인지센터·움직임센터를 방문해요.'],
          ['검사 진행','인지기능과 움직임 기능을 약 2시간 동안 점검해요.']
        ]
      }
    };

    function showScreen(name){
      screens.forEach(s=>s.classList.toggle('is-active',s.dataset.screen===name));
      window.scrollTo({top:0,behavior:'auto'});
    }
    function showToast(msg){
      toast.textContent=msg;toast.classList.add('is-show');
      clearTimeout(showToast.timer);
      showToast.timer=setTimeout(()=>toast.classList.remove('is-show'),2200);
    }

    document.querySelectorAll('[data-back]').forEach(b=>b.addEventListener('click',()=>showScreen(b.dataset.back)));
    document.querySelectorAll('[data-next]').forEach(b=>b.addEventListener('click',()=>showScreen(b.dataset.next)));
    document.querySelectorAll('[data-open-detail]').forEach(b=>b.addEventListener('click',()=>showScreen(`detail-${b.dataset.openDetail}`)));

    document.querySelectorAll('.accordion-item').forEach(item=>{
      item.addEventListener('click',()=>{
        const group=item.closest('.accordion');
        const panel=item.nextElementSibling;
        const open=item.classList.contains('is-open');
        group.querySelectorAll('.accordion-item').forEach(x=>{x.classList.remove('is-open');x.querySelector('b').textContent='＋'});
        group.querySelectorAll('.accordion-panel').forEach(x=>x.classList.remove('is-open'));
        if(!open){item.classList.add('is-open');item.querySelector('b').textContent='−';panel.classList.add('is-open')}
      });
    });

    document.querySelectorAll('[data-general-apply]').forEach(button=>{
      button.addEventListener('click',()=>{
        currentGeneralGift=button.dataset.generalApply;
        const meta=giftMeta[currentGeneralGift];
        document.getElementById('general-company').textContent=meta.company;
        document.getElementById('general-form-title').innerHTML=meta.formTitle;
        document.getElementById('general-form-lead').textContent=meta.formLead;
        document.getElementById('general-notice').textContent=meta.notice;
        document.querySelectorAll('.conditional-field').forEach(el=>el.classList.toggle('is-show',el.dataset.for===currentGeneralGift));
        showScreen('apply-general');
      });
    });

    document.getElementById('general-back').addEventListener('click',()=>showScreen(`detail-${currentGeneralGift}`));
    document.getElementById('general-submit').addEventListener('click',()=>{
      const name=document.getElementById('general-name').value.trim();
      const phone=document.getElementById('general-phone').value.trim();
      if(!name||!phone){showToast('이름과 연락처를 확인해주세요.');return}
      if(!document.getElementById('general-consent').checked){showToast('필수 동의 항목을 확인해주세요.');return}
      setComplete(currentGeneralGift);showScreen('complete');
    });

    document.getElementById('to-survey').addEventListener('click',()=>{
      const required=[...document.querySelectorAll('#delivery-form input[required]')];
      if(required.some(i=>!i.value.trim())){showToast('배송 정보를 모두 확인해주세요.');return}
      showScreen('apply-onyou-2');
    });

    document.getElementById('submit-onyou').addEventListener('click',()=>{
      const form=document.getElementById('survey-form');
      const qs=['q1','q2','q3','q4'];
      const missing=qs.find(q=>!form.querySelector(`input[name="${q}"]:checked`));
      if(missing){showToast('모든 질문에 답변해주세요.');return}
      if(!document.getElementById('consent').checked){showToast('필수 동의 항목을 확인해주세요.');return}
      setComplete('onyou');showScreen('complete');
    });

    function setComplete(type){
      const title=document.getElementById('complete-title');
      const lead=document.getElementById('complete-lead');
      const notice=document.getElementById('complete-notice');
      const flow=document.getElementById('complete-flow');
      const outfitFormLink=document.getElementById('outfit-form-link');
      outfitFormLink.hidden=true;
      title.innerHTML='웰컴기프트 신청이<br />완료됐어요.';
      if(type==='onyou'){
        lead.textContent='온유상조에서 안내 지류를 보내드릴 예정이에요.';
        notice.innerHTML='<strong>아직 온유상조에 가입된 것은 아니에요.</strong><p>지류 내용을 확인한 뒤 실제 가입 여부는 직접 결정할 수 있습니다.</p>';
        flow.innerHTML=[
          ['지류 발송','온유상조에서 등록된 주소로 발송해요.'],
          ['지류 수령','혜택과 이용 방법을 확인해보세요.'],
          ['가입 여부 결정','필요하다고 판단될 때 직접 선택할 수 있어요.']
        ].map((x,i)=>`<article><span>${i+1}</span><div><strong>${x[0]}</strong><p>${x[1]}</p></div></article>`).join('');
        return;
      }
      const meta=giftMeta[type];
      lead.textContent=meta.completeLead;
      notice.innerHTML=`<strong>${meta.completeStrong}</strong><p>${meta.completeText}</p>`;
      flow.innerHTML=meta.flow.map((x,i)=>`<article><span>${i+1}</span><div><strong>${x[0]}</strong><p>${x[1]}</p></div></article>`).join('');
      if(type==='outfit'){
        outfitFormLink.hidden=false;
        outfitFormLink.href=OUTFIT_FORM_URL||'#';
      }
    }

    document.getElementById('outfit-form-link').addEventListener('click',e=>{
      if(!OUTFIT_FORM_URL){e.preventDefault();showToast('시놀 전용 신청서 링크가 확정되면 연결됩니다.');}
    });

    document.getElementById('restart').addEventListener('click',()=>showScreen('gift'));
    document.getElementById('consent-detail').addEventListener('click',()=>{modal.classList.add('is-open');modal.setAttribute('aria-hidden','false')});
    document.querySelectorAll('[data-close-modal]').forEach(el=>el.addEventListener('click',()=>{modal.classList.remove('is-open');modal.setAttribute('aria-hidden','true')}));
