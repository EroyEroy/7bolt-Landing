// popup
const popupBtn = document.querySelector('.burger-open'),
	popupClose = document.querySelector('.burger-close'),
	popupContent = document.querySelector('.burger-menu'),
	popupLinks = document.querySelectorAll('.burger-menu__link'),
	burgerBackground = document.querySelector('.burger-menu__bg'),
	anchors = document.querySelectorAll('a[href*="#"]'),
	header = document.querySelector('.header');
// кнопка скролла вверх
// кнопка вверх
let btn = document.querySelector(".scroll");

let lastScroll = 0;
const defaultOffset = 200;
const scrollPosition = () => window.pageYOffset || document.documentElement.scrollTop;
const containHide = () => header.classList.contains('no_fix');

// появление кнопки на телефонах
if (window.matchMedia("(max-width: 479px)").matches) {
	buttonScrollTopMobile();
	header.style.position = 'fixed';
	window.addEventListener('scroll', () => {
		if (scrollPosition() > lastScroll && !containHide() && scrollPosition() > defaultOffset) {
			//scroll down
			header.classList.add('no_fix');
			document.querySelector('.btn-open__container').classList.add('no_fix')
		}
		else if (scrollPosition() < lastScroll && containHide()) {
			//scroll up
			header.classList.remove('no_fix');
			header.classList.add('fix');
			document.querySelector('.btn-open__container').classList.remove('no_fix')
			document.querySelector('.btn-open__container').classList.add('fix')
		}

		lastScroll = scrollPosition();
	});
}
function buttonScrollTopMobile() {
	window.addEventListener("scroll", function () {
		if (window.pageYOffset > 300) {
			btn.classList.add("scroll_active");
		} else {
			btn.classList.remove("scroll_active");
		}
	});

	btn.onclick = function (click) {
		click.preventDefault();
		scrollTo(0, 0);
	};
}

window.addEventListener('resize', () => {
	if (window.innerWidth > 959) {
		popupBtn.classList.remove('open');
		popupContent.classList.remove('active');
		document.body.classList.remove('overflow');
		burgerBackground.classList.remove('active');
	}
	if (window.innerWidth < 480) {
		buttonScrollTopMobile();
		header.style.position = 'fixed';
		window.addEventListener('scroll', () => {
			if (scrollPosition() > lastScroll && !containHide() && scrollPosition() > defaultOffset) {
				//scroll down
				header.classList.add('no_fix');
				document.querySelector('.btn-open__container').classList.add('no_fix')
			}
			else if (scrollPosition() < lastScroll && containHide()) {
				//scroll up
				header.classList.remove('no_fix');
				header.classList.add('fix');
				document.querySelector('.btn-open__container').classList.remove('no_fix')
				document.querySelector('.btn-open__container').classList.add('fix')
			}

			lastScroll = scrollPosition();
		});
	}
});
function archorsLink() {
	for (let anchor of anchors) {
		anchor.addEventListener('click', (e) => {
			e.preventDefault();
			const blockID = anchor.getAttribute('href');
			document.querySelector('' + blockID).scrollIntoView({
				behavior: "smooth",
				block: "start"
			})
		});
	};
};
function OpenPopup() {
	popupBtn.addEventListener('click', () => {
		popupBtn.classList.toggle('open');
		popupContent.classList.toggle('active');
		document.body.classList.toggle('overflow');
		burgerBackground.classList.toggle('active');
	});
	document.addEventListener('click', (e) => {
		const withinBoundariesBtn = e.composedPath().includes(popupBtn);
		const withinBoundariesContent = e.composedPath().includes(popupContent);

		if (!withinBoundariesBtn && !withinBoundariesContent) {
			popupBtn.classList.remove('open');
			popupContent.classList.remove('active');
			document.body.classList.remove('overflow');
			burgerBackground.classList.remove('active');
		}
	});
	popupLinks.forEach(link => {
		link.addEventListener('click', () => {
			popupBtn.classList.remove('open');
			popupContent.classList.remove('active');
			document.body.classList.remove('overflow');
			burgerBackground.classList.remove('active');
		});
	});
}
function closePopup() {
	popupClose.addEventListener('click', () => {
		popupBtn.classList.remove('open');
		popupContent.classList.remove('active');
		document.body.classList.remove('overflow');
		burgerBackground.classList.remove('active');
	});
}

function closePopupEsc() {
	// Закрытие окна по нажатию клавиши Escape.
	document.addEventListener('keydown', (event) => {
		if (event.key === 'Escape') {
			popupBtn.classList.remove('open');
			popupContent.classList.remove('active');
			document.body.classList.remove('overflow');
			burgerBackground.classList.remove('active');
		}
	});
}
OpenPopup();
closePopupEsc();
closePopup();