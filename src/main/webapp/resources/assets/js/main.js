/*
	Lens by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

var main = (function($) { var _ = {

	/**
	 * Settings.
	 * @var {object}
	 */
	settings: {

		// Preload all images.
			preload: false,

		// Slide duration (must match "duration.slide" in _vars.scss).
			slideDuration: 500,

		// Layout duration (must match "duration.layout" in _vars.scss).
			layoutDuration: 750,

		// Thumbnails per "row" (must match "misc.thumbnails-per-row" in _vars.scss).
			thumbnailsPerRow: 2,

		// Side of main wrapper (must match "misc.main-side" in _vars.scss).
			mainSide: 'right'

	},

	/**
	 * Window.
	 * @var {jQuery}
	 */
	$window: null,

	/**
	 * Body.
	 * @var {jQuery}
	 */
	$body: null,

	/**
	 * Main wrapper.
	 * @var {jQuery}
	 */
	$main: null,

	/**
	 * Thumbnails.
	 * @var {jQuery}
	 */
	$thumbnails: null,

	/**
	 * Viewer.
	 * @var {jQuery}
	 */
	$viewer: null,

	/**
	 * Toggle.
	 * @var {jQuery}
	 */
	$toggle: null,

	/**
	 * Nav (next).
	 * @var {jQuery}
	 */
	$navNext: null,

	/**
	 * Nav (previous).
	 * @var {jQuery}
	 */
	$navPrevious: null,

	/**
	 * Slides.
	 * @var {array}
	 */
	slides: [],

	/**
	 * Current slide index.
	 * @var {integer}
	 */
	current: null,

	/**
	 * Lock state.
	 * @var {bool}
	 */
	locked: false,

	/**
	 *  상태.
	 * @var {bool}
	 */
	pageNext : true, pagePre: true,val1: true,
	
	/**
	 *  상태2.
	 * @var {bool}
	 */
	val2: true, val3 : true,
	
	/**
	 * Keyboard shortcuts.
	 * @var {object}
	 */
	keys: {

		// Escape: Toggle main wrapper.
			27: function() {
				_.toggle();
			},

		// Up: Move up.
			38: function() {
				_.up();
			},

		// Down: Move down.
			40: function() {
				_.down();
			},

		// Space: Next.
			32: function() {
				_.next();
			},

		// Right Arrow: Next.
			39: function() {
				_.next();
			},

		// Left Arrow: Previous.
			37: function() {
				_.previous();
			}

	},
	

	/**
	 * Initialize properties.
	 */
	initProperties: function() {

		// Window, body.
			_.$window = $(window);
			_.$body = $('body');

		// Thumbnails.
			_.$thumbnails = $('#thumbnails');

		// Viewer.
			_.$viewer = $(
				'<div id="viewer">' +
					'<div class="inner">' +
						'<div class="nav-next"></div>' +
						'<div class="nav-previous"></div>' +
						'<div class="toggle"></div>' +
					'</div>' +
				'</div>'
			).appendTo(_.$body);

		// Nav.
			_.$navNext = _.$viewer.find('.nav-next');
			_.$navPrevious = _.$viewer.find('.nav-previous');

		// Main wrapper.
			_.$main = $('#main');

		// Toggle.
			$('<div class="toggle"></div>')
				.appendTo(_.$main);

			_.$toggle = $('.toggle');

	},

	/**
	 * Initialize events.
	 */
	initEvents: function() {

		// Window.

			// Remove is-preload-* classes on load.
				_.$window.on('load', function() {

					_.$body.removeClass('is-preload-0');

					window.setTimeout(function() {
						_.$body.removeClass('is-preload-1');
					}, 100);

					window.setTimeout(function() {
						_.$body.removeClass('is-preload-2');
					}, 100 + Math.max(_.settings.layoutDuration - 150, 0));

				});

			// Disable animations/transitions on resize.
				var resizeTimeout;

				_.$window.on('resize', function() {

					_.$body.addClass('is-preload-0');
					window.clearTimeout(resizeTimeout);

					resizeTimeout = window.setTimeout(function() {
						_.$body.removeClass('is-preload-0');
					}, 100);

				});

		// Viewer.

			// Hide main wrapper on tap (<= medium only).
				_.$viewer.on('touchend', function() {

					if (breakpoints.active('<=medium'))
						_.hide();

				});

			// Touch gestures.
				_.$viewer
					.on('touchstart', function(event) {

						// Record start position.
							_.$viewer.touchPosX = event.originalEvent.touches[0].pageX;
							_.$viewer.touchPosY = event.originalEvent.touches[0].pageY;

					})
					.on('touchmove', function(event) {

						// No start position recorded? Bail.
							if (_.$viewer.touchPosX === null
							||	_.$viewer.touchPosY === null)
								return;

						// Calculate stuff.
							var	diffX = _.$viewer.touchPosX - event.originalEvent.touches[0].pageX,
								diffY = _.$viewer.touchPosY - event.originalEvent.touches[0].pageY;
								boundary = 20,
								delta = 50;

						// Swipe left (next).
							if ( (diffY < boundary && diffY > (-1 * boundary)) && (diffX > delta) )
								_.next();

						// Swipe right (previous).
							else if ( (diffY < boundary && diffY > (-1 * boundary)) && (diffX < (-1 * delta)) )
								_.previous();

						// Overscroll fix.
							var	th = _.$viewer.outerHeight(),
								ts = (_.$viewer.get(0).scrollHeight - _.$viewer.scrollTop());

							if ((_.$viewer.scrollTop() <= 0 && diffY < 0)
							|| (ts > (th - 2) && ts < (th + 2) && diffY > 0)) {

								event.preventDefault();
								event.stopPropagation();

							}

					});
					
		// Main.

			// Touch gestures.
				_.$main
					.on('touchstart', function(event) {

						// Bail on xsmall.
							if (breakpoints.active('<=xsmall'))
								return;

						// Record start position.
							_.$main.touchPosX = event.originalEvent.touches[0].pageX;
							_.$main.touchPosY = event.originalEvent.touches[0].pageY;

					})
					.on('touchmove', function(event) {

						// Bail on xsmall.
							if (breakpoints.active('<=xsmall'))
								return;

						// No start position recorded? Bail.
							if (_.$main.touchPosX === null
							||	_.$main.touchPosY === null)
								return;

						// Calculate stuff.
							var	diffX = _.$main.touchPosX - event.originalEvent.touches[0].pageX,
								diffY = _.$main.touchPosY - event.originalEvent.touches[0].pageY;
								boundary = 20,
								delta = 50,
								result = false;

						// Swipe to close.
							switch (_.settings.mainSide) {

								case 'left':
									result = (diffY < boundary && diffY > (-1 * boundary)) && (diffX > delta);
									break;

								case 'right':
									result = (diffY < boundary && diffY > (-1 * boundary)) && (diffX < (-1 * delta));
									break;

								default:
									break;

							}

							if (result)
								_.hide();

						// Overscroll fix.
							var	th = _.$main.outerHeight(),
								ts = (_.$main.get(0).scrollHeight - _.$main.scrollTop());

							if ((_.$main.scrollTop() <= 0 && diffY < 0)
							|| (ts > (th - 2) && ts < (th + 2) && diffY > 0)) {

								event.preventDefault();
								event.stopPropagation();

							}

					});
		// Toggle.
			_.$toggle.on('click', function() {
				_.toggle();
			});

			// Prevent event from bubbling up to "hide event on tap" event.
				_.$toggle.on('touchend', function(event) {
					event.stopPropagation();
				});

		// Nav.
			_.$navNext.on('click', function() {
				_.next();
			});

			_.$navPrevious.on('click', function() {
				_.previous();
			});
			
			
		// Keyboard shortcuts.

			// Ignore shortcuts within form elements.
				_.$body.on('keydown', 'input,select,textarea', function(event) {
					event.stopPropagation();
				});

			_.$window.on('keydown', function(event) {

				// Ignore if xsmall is active.
					if (breakpoints.active('<=xsmall'))
						return;

				// Check keycode.
					if (event.keyCode in _.keys) {

						// Stop other events.
							event.stopPropagation();
							event.preventDefault();

						// Call shortcut.
							(_.keys[event.keyCode])();

					}

			});

	},

	/**
	 * Initialize viewer.
	 */
	initViewer: function() {

		// Bind thumbnail click event.
			_.$thumbnails
				.on('click', '.thumbnail', function(event) {

					var $this = $(this);

					// Stop other events.
						event.preventDefault();
						event.stopPropagation();

					// Locked? Blur.
						if (_.locked)
							$this.blur();

					// Switch to this thumbnail's slide.
						_.switchTo($this.data('index'));

				});

		// Create slides from thumbnails.
			_.$thumbnails.children()
				.each(function() {

					var	$this = $(this),
						$thumbnail = $this.children('.thumbnail'),
						s;

					// Slide object.
						s = {
							$parent: $this,
							$slide: null,
							$slideImage: null,
							$slideCaption: null,
							url: $thumbnail.attr('href'),
							loaded: false
						};

					// Parent.
						$this.attr('tabIndex', '-1');

					// Slide.

						// Create elements.
	 						s.$slide = $('<div class="slide"><div class="caption"></div><div class="image"></div></div>');
							
	 					// Image.
 							s.$slideImage = s.$slide.children('.image');
							
 							// Set background stuff.
	 							s.$slideImage
		 							.css('background-image', '')
		 							.css('background-position', ($thumbnail.data('position') || 'center'))
		 							.attr('id', _.slides.length + 1);

						// Caption.
							s.$slideCaption = s.$slide.find('.caption');

							// Move everything *except* the thumbnail itself to the caption.
								$this.children().not($thumbnail)
									.appendTo(s.$slideCaption);

					// Preload?
						if (_.settings.preload) {

							// Force image to download.
								var $img = $('<img src="' + s.url + '" />');

							// Set slide's background image to it.
								s.$slideImage
									.css('background-image', 'url(' + s.url + ')');

							// Mark slide as loaded.
								s.$slide.addClass('loaded');
								s.loaded = true;
						}

					// Add to slides array.
						_.slides.push(s);

					// Set thumbnail's index.
						$thumbnail.data('index', _.slides.length - 1);

				});
	},

	/**
	 * Initialize stuff.
	 */
	init: function() {

		// Breakpoints.
			breakpoints({
				xlarge:  [ '1281px',  '1680px' ],
				large:   [ '981px',   '1280px' ],
				medium:  [ '737px',   '980px'  ],
				small:   [ '481px',   '736px'  ],
				xsmall:  [ null,      '480px'  ]
			});

		// Everything else.
			_.initProperties();
			_.initViewer();
			_.initEvents();
			
		// Show first slide if xsmall isn't active.
			breakpoints.on('>xsmall', function() {

				if (_.current === null)
					_.switchTo(0, true);

			});
			_.button();
//			_.buttonClick();
	},
	
	/**
	 * Switch to a specific slide.
	 * @param {integer} index Index.
	 */
	switchTo: function(index, noHide) {

		// Already at index and xsmall isn't active? Bail.
			if (_.current == index
			&&	!breakpoints.active('<=xsmall'))
				return;

		// Locked? Bail.
			if (_.locked)
				return;

		// Lock.
			_.locked = true;

		// Hide main wrapper if medium is active.
			if (!noHide
			&&	breakpoints.active('<=medium'))
				_.hide();

		// Get slides.
			var	oldSlide = (_.current !== null ? _.slides[_.current] : null),
				newSlide = _.slides[index];

		// Update current.
			_.current = index;

		// Deactivate old slide (if there is one).
			if (oldSlide) {

				// Thumbnail.
					oldSlide.$parent
						.removeClass('active');

				// Slide.
					oldSlide.$slide.removeClass('active');

			}

		// Activate new slide.

			// Thumbnail.
				newSlide.$parent
					.addClass('active')
					.focus();

			// Slide.
				var f = function() {
						
					// Old slide exists? Detach it.
						if (oldSlide)
							oldSlide.$slide.detach();

					// Attach new slide.
						newSlide.$slide.appendTo(_.$viewer);

					// New slide not yet loaded?
						if (!newSlide.loaded) {

							window.setTimeout(function() {

								// Mark as loading.
									newSlide.$slide.addClass('loading');

								// Wait for it to load.
									$('<img src="' + newSlide.url + '" />').on('load', function() {
									//window.setTimeout(function() {

										// Set background image.
											newSlide.$slideImage
												.css('background-image', 'url(' + newSlide.url + ')');

										// Mark as loaded.
											newSlide.loaded = true;
											newSlide.$slide.removeClass('loading');

										// Mark as active.
											newSlide.$slide.addClass('active');

										// Unlock.
											window.setTimeout(function() {
												_.locked = false;
											}, 100);

									//}, 1000);
									});
								
									_.button();
								
							}, 100);

						}

					// Otherwise ...
						else {

							window.setTimeout(function() {

								// Mark as active.
									newSlide.$slide.addClass('active');

								// Unlock.
									window.setTimeout(function() {
										_.locked = false;
									}, 100);
								
									_.button();
								
							}, 100);
 
						}

				};

				// No old slide? Switch immediately.
					if (!oldSlide){
						(f)();
						
					}
				// Otherwise, wait for old slide to disappear first.
					else
						window.setTimeout(f, _.settings.slideDuration);
																					//_.button(); //여기두면 버튼 누르면 나타남ㅠㅠ
	
	},

	/**
	 * Switches to the next slide.
	 */
	next: function() {

		// Calculate new index.
			var i, c = _.current, l = _.slides.length;

			if (c >= l - 1)
				i = 0;
			else
				i = c + 1;

		// Switch.
			_.switchTo(i);
																
	},

	/**
	 * Switches to the previous slide.
	 */
	previous: function() {

		// Calculate new index.
			var i, c = _.current, l = _.slides.length;

			if (c <= 0)
				i = l - 1;
			else
				i = c - 1;

		// Switch.
			_.switchTo(i);
	},

	/**
	 * Switches to slide "above" current.
	 */
	up: function() {

		// Fullscreen? Bail.
			if (_.$body.hasClass('fullscreen'))
				return;

		// Calculate new index.
			var i, c = _.current, l = _.slides.length, tpr = _.settings.thumbnailsPerRow;

			if (c <= (tpr - 1))
				i = l - (tpr - 1 - c) - 1;
			else
				i = c - tpr;

		// Switch.
			_.switchTo(i);
	},

	/**
	 * Switches to slide "below" current.
	 */
	down: function() {

		// Fullscreen? Bail.
			if (_.$body.hasClass('fullscreen'))
				return;

		// Calculate new index.
			var i, c = _.current, l = _.slides.length, tpr = _.settings.thumbnailsPerRow;

			if (c >= l - tpr)
				i = c - l + tpr;
			else
				i = c + tpr;

		// Switch.
			_.switchTo(i);

	},

	/**
	 * Shows the main wrapper.
	 */
	show: function() {

		// Already visible? Bail.
			if (!_.$body.hasClass('fullscreen'))
				return;

		// Show main wrapper.
			_.$body.removeClass('fullscreen');

		// Focus.
			_.$main.focus();

	},

	/**
	 * Hides the main wrapper.
	 */
	hide: function() {

		// Already hidden? Bail.
			if (_.$body.hasClass('fullscreen'))
				return;

		// Hide main wrapper.
			_.$body.addClass('fullscreen');

		// Blur.
			_.$main.blur();

	},

	/**
	 * Toggles main wrapper.
	 */
	toggle: function() {

		if (_.$body.hasClass('fullscreen'))
			_.show();
		else
			_.hide();

	},
	
	//버튼로딩
	
		button : function(){
		
//		alert(_.val2);
//		alert(_.current);
		
		if(_.val1){
			$("#1").append("<div id=\"img1_1\" style=\"position: relative; top: 200px; left: 360px;\"></div>");
			$("#img1_1").append("<button class=\"searching\" value=\"델몬트 토마토\">  </button>");
			
			$("#1").append("<div id=\"img1_2\" style=\"position: relative; top: 200px; left: 590px;\"></div>");
			$("#img1_2").append("<button class=\"searching\" value=\"델몬트 망고\">  </button>");
			
			$("#1").append("<div id=\"img1_3\" style=\"position: relative; top: 200px; left: 690px;\"></div>");
			$("#img1_3").append("<button class=\"searching\" value=\"델몬트 알로에\">  </button>");
			
			$("#1").append("<div id=\"img1_4\" style=\"position: relative; top: 200px; left: 770px;\"></div>");
			$("#img1_4").append("<button class=\"searching\" value=\"미닛메이드 알로에\">  </button>");
			
			$("#1").append("<div id=\"img1_5\" style=\"position: relative; top: 200px; left: 870px;\"></div>");
			$("#img1_5").append("<button class=\"searching\" value=\"갈아만든 배\">  </button>");
			
			$("#1").append("<div id=\"img1_6\" style=\"position: relative; top: 200px; left: 50px;\"></div>");
			$("#img1_6").append("<button class=\"searching\" value=\"과일사이다\">  </button>");
			
			$("#1").append("<div id=\"img1_7\" style=\"position: relative; top: 200px; left: -70px;\"></div>");
			$("#img1_7").append("<button class=\"searching\" value=\"코카콜라\">  </button>");
			
			$("#1").append("<div id=\"img1_8\" style=\"position: relative; top: 200px; left: -220px;\"></div>");
			$("#img1_8").append("<button class=\"searching\" value=\"스프라이트\">  </button>");
			
			$("#1").append("<div id=\"img1_9\" style=\"position: relative; top: 650px; left: 30px;\"></div>");
			$("#img1_9").append("<button class=\"searching\" value=\"델몬트 포도\">  </button>");
			
			$("#1").append("<div id=\"img1_10\" style=\"position: relative; top: 650px; left: 110px;\"></div>");
			$("#img1_10").append("<button class=\"searching\" value=\"델몬트 사과\">  </button>");
			
			$("#1").append("<div id=\"img1_11\" style=\"position: relative; top: 650px; left: 350px;\"></div>");
			$("#img1_11").append("<button class=\"searching\" value=\"아침에주스\">  </button>");
			
			$("#1").append("<div id=\"img1_12\" style=\"position: relative; top: 650px; left: 600px;\"></div>");
			$("#img1_12").append("<button class=\"searching\" value=\"썬업\">  </button>");
			_.buttonClick();
			_.val1=false;
		}
	
		else if(_.current == 1 && _.val2){
			$("#2").append("<div id=\"img2_1\" style=\"position: relative; top: 380px; left: 350px;\"></div>");
			$("#img2_1").append("<button class=\"searching\" value=\"포카리스웨트\">   </button>");
			
			$("#2").append("<div id=\"img2_2\" style=\"position: relative; top: 380px; left: 375px;\"></div>");
			$("#img2_2").append("<button class=\"searching\" value=\"게토레이\">   </button>");
			
			$("#2").append("<div id=\"img2_3\" style=\"position: relative; top: 380px; left: 390px;\"></div>");
			$("#img2_3").append("<button class=\"searching\" value=\"실론티\">   </button>");
			
			$("#2").append("<div id=\"img2_4\" style=\"position: relative; top: 380px; left: 410px;\"></div>");
			$("#img2_4").append("<button class=\"searching\" value=\"솔의눈\">   </button>");
			
			$("#2").append("<div id=\"img2_5\" style=\"position: relative; top: 380px; left: 455px;\"></div>");
			$("#img2_5").append("<button class=\"searching\" value=\"핫식스\">   </button>");
			
			$("#2").append("<div id=\"img2_6\" style=\"position: relative; top: 380px; left: 510px;\"></div>");
			$("#img2_6").append("<button class=\"searching\" value=\"레드불\">   </button>");
			
			$("#2").append("<div id=\"img2_7\" style=\"position: relative; top: 380px; left: 680px;\"></div>");
			$("#img2_7").append("<button class=\"searching\" value=\"몬스터\">   </button>");
			
			$("#2").append("<div id=\"img2_8\" style=\"position: relative; top: 380px; left: -130px;\"></div>");
			$("#img2_8").append("<button class=\"searching\" value=\"2%부족할때\">   </button>");
			
			$("#2").append("<div id=\"img2_9\" style=\"position: relative; top: 645px; left: 360px;\"></div>");
			$("#img2_9").append("<button class=\"searching\" value=\"환타\">   </button>");
			
			$("#2").append("<div id=\"img2_10\" style=\"position: relative; top: 645px; left: 440px;\"></div>");
			$("#img2_10").append("<button class=\"searching\" value=\"암바사\">   </button>");
			
			
			_.buttonClick();
			_.val2=false;
		}
		
		else if(_.current == 2 && _.val3){
			$("#3").append("<div id=\"img3_1\" style=\"position: relative; top: 370px; left: 500px;\"></div>");
			$("#img3_1").append("<button class=\"searching\" value=\"하이트\">     </button>");
			
			$("#3").append("<div id=\"img3_2\" style=\"position: relative; top: 370px; left: 150px;\"></div>");
			$("#img3_2").append("<button class=\"searching\" value=\"테라\">     </button>");
			
			$("#3").append("<div id=\"img3_3\" style=\"position: relative; top: 370px; left: 850px;\"></div>");
			$("#img3_3").append("<button class=\"searching\" value=\"카스\">     </button>");
				_.buttonClick();
			_.val3=false;
		}
	},
		
	buttonClick : function(){		
		$(".searching").on("click",function(){
		var query=$(this).val();
		if(confirm(query+"를 장바구니에 담으시겠습니까?")==true){
			searching(query);
			alert(query+"를 장바구니에 담았습니다");
			}
		});
		
		 function searching(query){
		
		$.ajax({
			url :'/searching',
			type : 'get',
			data :{
					query:query,
					display:1
					},
			success : function(data){
				var jsonObject = JSON.parse(data);
				console.log(jsonObject);

				var product_link="";
				var product_image="";
				var product_nm="";
					$.each(jsonObject.items,function(index,item){
						product_link=item.link;
						product_image=item.image;
						product_nm=item.title;
						});
					

					
					//장바구니 등록
					$.ajax({
						url : "/cartInsert",
						type : "post",
						data : {
							product_link : product_link,
							product_image:product_image,
							product_nm:product_nm
							},
						dataType :"json",
						success : function(data){
							console.log(data);
							},
						error : function(e){
							console.log(e);
							}
						});
				},
				
			error : function(e){
				console.log(e);	
				}
			});
		}	 
	},	

	
	
	//여기까지
	

}; return _; })(jQuery); main.init(); 