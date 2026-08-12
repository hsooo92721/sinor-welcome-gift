const screens = [
  ...document.querySelectorAll(".screen")
];

const toast =
  document.getElementById("toast");

const modal =
  document.getElementById("consent-modal");

const outfitFormLink =
  document.getElementById("outfit-form-link");

let currentGeneralGift = "outfit";


/*
  시놀 전용 아웃핏코드 구글폼이 확정되면
  주소만 이 변수에 들어가면 됩니다.

  현재 업체가 전달한 KT 구글폼은
  참고자료이므로 실제 신청 주소로 연결하지 않습니다.
*/
const OUTFIT_FORM_URL = "";


/* =====================================================
  GIFT META
===================================================== */

const giftMeta = {

  outfit: {

    company:
      "아웃핏코드",

    formTitle:
      "웰컴기프트 신청 정보를<br />확인해주세요.",

    formLead:
      "시놀에서 혜택 신청을 완료한 뒤 아웃핏코드 신청서에서 사진과 분석 정보를 입력합니다.",

    notice:
      "리포트 제작에 필요한 상세정보와 얼굴·체형 사진은 다음 단계의 아웃핏코드 신청서에서 직접 입력합니다.",

    completeLead:
      "이제 아웃핏코드 신청서를 작성하면 리포트 제작 접수가 완료돼요.",

    completeStrong:
      "시놀 웰컴기프트 신청이 완료됐어요.",

    completeText:
      "아웃핏코드 신청서에서 필요한 정보와 사진 업로드까지 완료해주세요.",

    flow: [

      [
        "신청서 작성",
        "아웃핏코드 구글폼에서 이름, 성별, 나이, 키·몸무게 등 필요한 정보를 입력해요."
      ],

      [
        "사진 2장 업로드",
        "촬영 가이드에 맞춰 얼굴 정면 사진과 체형 정면 사진을 각각 1장씩 올려요."
      ],

      [
        "리포트 수령",
        "신청서 작성 후 약 1주 이내 입력한 이메일로 맞춤 스타일링 리포트가 발송돼요."
      ]

    ]

  },


  care: {

    company:
      "OO케어",

    formTitle:
      "케어 이용 안내를 받을<br />정보를 확인해주세요.",

    formLead:
      "예약 및 이용 가능한 지점 안내에 필요한 최소 정보를 전달합니다.",

    notice:
      "무료 관리 범위, 지점, 추가비용 및 현장 권유 여부는 업체 확인 후 최종 반영됩니다.",

    completeLead:
      "OO케어에서 예약 및 이용 방법을 안내드릴 예정이에요.",

    completeStrong:
      "케어 웰컴기프트 신청이 완료됐어요.",

    completeText:
      "실제 관리 종류와 예약 일정은 OO케어 안내를 통해 확정됩니다.",

    flow: [

      [
        "이용 안내",
        "OO케어에서 이용 가능한 지점과 프로그램을 안내해요."
      ],

      [
        "예약",
        "원하는 일정과 지점을 확인해 예약해요."
      ],

      [
        "케어 이용",
        "무료 제공 범위를 확인하고 서비스를 이용해요."
      ]

    ]

  }

};


/* =====================================================
  SCREEN
===================================================== */

function showScreen(name){

  screens.forEach(screen => {

    screen.classList.toggle(
      "is-active",
      screen.dataset.screen === name
    );

  });

  window.scrollTo({
    top:0,
    behavior:"auto"
  });

}


/* =====================================================
  TOAST
===================================================== */

function showToast(message){

  toast.textContent = message;

  toast.classList.add(
    "is-show"
  );

  clearTimeout(
    showToast.timer
  );

  showToast.timer =
    setTimeout(() => {

      toast.classList.remove(
        "is-show"
      );

    },2200);

}


/* =====================================================
  BACK
===================================================== */

document
  .querySelectorAll("[data-back]")
  .forEach(button => {

    button.addEventListener(
      "click",
      () => {

        showScreen(
          button.dataset.back
        );

      }
    );

  });


/* =====================================================
  NEXT
===================================================== */

document
  .querySelectorAll("[data-next]")
  .forEach(button => {

    button.addEventListener(
      "click",
      () => {

        showScreen(
          button.dataset.next
        );

      }
    );

  });


/* =====================================================
  GIFT DETAIL
===================================================== */

document
  .querySelectorAll("[data-open-detail]")
  .forEach(button => {

    button.addEventListener(
      "click",
      () => {

        showScreen(
          `detail-${button.dataset.openDetail}`
        );

      }
    );

  });


/* =====================================================
  ACCORDION
===================================================== */

document
  .querySelectorAll(".accordion-item")
  .forEach(item => {

    item.addEventListener(
      "click",
      () => {

        const group =
          item.closest(".accordion");

        const panel =
          item.nextElementSibling;

        const isOpen =
          item.classList.contains(
            "is-open"
          );


        group
          .querySelectorAll(
            ".accordion-item"
          )
          .forEach(button => {

            button.classList.remove(
              "is-open"
            );

            const icon =
              button.querySelector("b");

            if(icon){
              icon.textContent = "＋";
            }

          });


        group
          .querySelectorAll(
            ".accordion-panel"
          )
          .forEach(panel => {

            panel.classList.remove(
              "is-open"
            );

          });


        if(!isOpen){

          item.classList.add(
            "is-open"
          );

          const icon =
            item.querySelector("b");

          if(icon){
            icon.textContent = "−";
          }

          panel.classList.add(
            "is-open"
          );

        }

      }
    );

  });


/* =====================================================
  GENERAL APPLY
===================================================== */

document
  .querySelectorAll("[data-general-apply]")
  .forEach(button => {

    button.addEventListener(
      "click",
      () => {

        currentGeneralGift =
          button.dataset.generalApply;

        const meta =
          giftMeta[currentGeneralGift];


        document
          .getElementById(
            "general-company"
          )
          .textContent =
            meta.company;


        document
          .getElementById(
            "general-form-title"
          )
          .innerHTML =
            meta.formTitle;


        document
          .getElementById(
            "general-form-lead"
          )
          .textContent =
            meta.formLead;


        document
          .getElementById(
            "general-notice"
          )
          .textContent =
            meta.notice;


        document
          .querySelectorAll(
            ".conditional-field"
          )
          .forEach(element => {

            element.classList.toggle(
              "is-show",
              element.dataset.for === currentGeneralGift
            );

          });


        showScreen(
          "apply-general"
        );

      }
    );

  });


/* =====================================================
  GENERAL BACK
===================================================== */

document
  .getElementById("general-back")
  .addEventListener(
    "click",
    () => {

      showScreen(
        `detail-${currentGeneralGift}`
      );

    }
  );


/* =====================================================
  GENERAL SUBMIT
===================================================== */

document
  .getElementById("general-submit")
  .addEventListener(
    "click",
    () => {

      const name =
        document
          .getElementById(
            "general-name"
          )
          .value
          .trim();


      const phone =
        document
          .getElementById(
            "general-phone"
          )
          .value
          .trim();


      if(!name || !phone){

        showToast(
          "이름과 연락처를 확인해주세요."
        );

        return;

      }


      const consent =
        document
          .getElementById(
            "general-consent"
          );


      if(!consent.checked){

        showToast(
          "필수 동의 항목을 확인해주세요."
        );

        return;

      }


      setComplete(
        currentGeneralGift
      );

      showScreen(
        "complete"
      );

    }
  );


/* =====================================================
  ONYOU STEP 1
===================================================== */

document
  .getElementById("to-survey")
  .addEventListener(
    "click",
    () => {

      const required = [
        ...document.querySelectorAll(
          "#delivery-form input[required]"
        )
      ];


      const hasEmpty =
        required.some(
          input =>
            !input.value.trim()
        );


      if(hasEmpty){

        showToast(
          "배송 정보를 모두 확인해주세요."
        );

        return;

      }


      showScreen(
        "apply-onyou-2"
      );

    }
  );


/* =====================================================
  ONYOU SUBMIT
===================================================== */

document
  .getElementById("submit-onyou")
  .addEventListener(
    "click",
    () => {

      const form =
        document.getElementById(
          "survey-form"
        );


      const questions = [
        "q1",
        "q2",
        "q3",
        "q4"
      ];


      const missing =
        questions.find(
          question => {

            return !form.querySelector(
              `input[name="${question}"]:checked`
            );

          }
        );


      if(missing){

        showToast(
          "모든 질문에 답변해주세요."
        );

        return;

      }


      const consent =
        document.getElementById(
          "consent"
        );


      if(!consent.checked){

        showToast(
          "필수 동의 항목을 확인해주세요."
        );

        return;

      }


      setComplete(
        "onyou"
      );

      showScreen(
        "complete"
      );

    }
  );


/* =====================================================
  COMPLETE
===================================================== */

function setComplete(type){

  const title =
    document.getElementById(
      "complete-title"
    );

  const lead =
    document.getElementById(
      "complete-lead"
    );

  const notice =
    document.getElementById(
      "complete-notice"
    );

  const flow =
    document.getElementById(
      "complete-flow"
    );


  title.innerHTML =
    "웰컴기프트 신청이<br />완료됐어요.";


  /*
    기본값:
    아웃핏코드 신청서 버튼 숨김
  */
  outfitFormLink.hidden = true;


  /* =================================================
    온유상조
  ================================================= */

  if(type === "onyou"){

    lead.textContent =
      "온유상조에서 안내 지류를 보내드릴 예정이에요.";


    notice.innerHTML = `
      <strong>
        아직 온유상조에 가입된 것은 아니에요.
      </strong>

      <p>
        지류 내용을 확인한 뒤
        실제 가입 여부는 직접 결정할 수 있습니다.
      </p>
    `;


    const onyouFlow = [

      [
        "지류 발송",
        "온유상조에서 등록된 주소로 발송해요."
      ],

      [
        "지류 수령",
        "혜택과 이용 방법을 확인해보세요."
      ],

      [
        "가입 여부 결정",
        "필요하다고 판단될 때 직접 선택할 수 있어요."
      ]

    ];


    flow.innerHTML =
      onyouFlow
        .map(
          (item,index) => `
            <article>

              <span>
                ${index + 1}
              </span>

              <div>

                <strong>
                  ${item[0]}
                </strong>

                <p>
                  ${item[1]}
                </p>

              </div>

            </article>
          `
        )
        .join("");


    return;

  }


  /* =================================================
    아웃핏코드 / 케어
  ================================================= */

  const meta =
    giftMeta[type];


  lead.textContent =
    meta.completeLead;


  notice.innerHTML = `
    <strong>
      ${meta.completeStrong}
    </strong>

    <p>
      ${meta.completeText}
    </p>
  `;


  flow.innerHTML =
    meta.flow
      .map(
        (item,index) => `
          <article>

            <span>
              ${index + 1}
            </span>

            <div>

              <strong>
                ${item[0]}
              </strong>

              <p>
                ${item[1]}
              </p>

            </div>

          </article>
        `
      )
      .join("");


  /* =================================================
    아웃핏코드 신청서 버튼
  ================================================= */

  if(type === "outfit"){

    outfitFormLink.hidden =
      false;


    if(OUTFIT_FORM_URL){

      outfitFormLink.href =
        OUTFIT_FORM_URL;

    }else{

      outfitFormLink.href =
        "#";

    }

  }

}


/* =====================================================
  OUTFIT FORM LINK
===================================================== */

outfitFormLink.addEventListener(
  "click",
  event => {

    if(!OUTFIT_FORM_URL){

      event.preventDefault();

      showToast(
        "시놀 전용 신청서가 준비되면 연결됩니다."
      );

    }

  }
);


/* =====================================================
  RESTART
===================================================== */

document
  .getElementById("restart")
  .addEventListener(
    "click",
    () => {

      outfitFormLink.hidden =
        true;

      showScreen(
        "gift"
      );

    }
  );


/* =====================================================
  CONSENT MODAL
===================================================== */

document
  .getElementById("consent-detail")
  .addEventListener(
    "click",
    () => {

      modal.classList.add(
        "is-open"
      );

      modal.setAttribute(
        "aria-hidden",
        "false"
      );

    }
  );


document
  .querySelectorAll(
    "[data-close-modal]"
  )
  .forEach(element => {

    element.addEventListener(
      "click",
      () => {

        modal.classList.remove(
          "is-open"
        );

        modal.setAttribute(
          "aria-hidden",
          "true"
        );

      }
    );

  });
