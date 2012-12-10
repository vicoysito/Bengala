(function($)
{	
	/**********************************************************************/

	var Nostalgia=function(options,page,slide)
	{
		/******************************************************************/
	
		var defaults=
		{
			tab			:	'left',
			className	:	'chekmark'
		};
	
		var $this=this;

		$this.page=page;
		$this.slide=slide;
		$this.options=options;
		
		$this.options=$.extend(options,defaults);
		
		$this.enable=false;
		
		$this.currentHash='';
		$this.previousHash='';
		
		$this.tabContent=false;
		
		$this.startPreloader=$('#start-preloader');
		$this.backgroundOverlay=$('#background-overlay');
		
		$this.nostalgia=$('#nostalgia');
		
		/***/
		
		$this.nostalgiaNavigation=$('#nostalgia-navigation');
		$this.nostalgiaNavigationMenu=$('#nostalgia-navigation-menu');
		$this.nostalgiaNavigationMenuList=$('#nostalgia-navigation-menu ul');
		$this.nostalgiaNavigationNameBox=$('#nostalgia-navigation-name-box');
		$this.nostalgiaNavigationClickHereBox=$('#nostalgia-navigation-click-here-box');			
		
		$this.nostalgiaNavigationMenuHeight=config.menu_height;
		$this.nostalgiaNavigationStartLeftPosition=10;
		
		/***/
	
		$this.nostalgiaTab=$('#nostalgia-tab');
		$this.nostalgiaTabIcon=$('#nostalgia-tab-icon');
	
		$this.nostalgiaTabWidth=50;
		$this.nostalgiaTabMargin=5;
		
		$this.nostalgiaTabIconWidth=parseInt($('#nostalgia-tab-icon').css('width'));
		
		$this.supersizedControl=$('#supersized-control');

		$this.nostalgiaTabContentMenuSelect=$('#nostalgia-tab-content-menu-select');
		
		$this.breakpoint=[1130,1100,915,675];

		/******************************************************************/
		
		this.load=function()
		{		
			$(window).resize(function() 
			{
				$this.setPosition();
				$this.createScrollbar(true);
			});
			
			$this.setPosition();
			
			$this.createMenuSlider();
			$this.createSupersizedSlider();
			
			$this.createNostalgiaTabContentMenu();

			$this.createStartPrealoder({complete:function()
			{	
				$this.startPreloader.children('div:first').fadeOut(300,function() 
				{
					$this.startPreloader.animate({width:0},1000,'easeOutQuint',function() 
					{
						$this.blink($this.nostalgiaNavigationClickHereBox);	
						$this.showSupersizedSliderControl(true);
						
						$this.nostalgiaNavigationNameBox.bind('click',function() 
						{
							if(parseInt($this.nostalgiaNavigationMenu.height())==0) 
							{
								window.location.href='#!/menu';
								$this.showNavigationMenu(true,{complete:function() 
								{
									$this.showNavigationClickHereBox(false);
								}});
							}
						});
						
						$this.backgroundOverlay.css('display','block');

						$this.enable=true;
						$this.handleHash();
					});
				});
			}});
		};
		
		/******************************************************************/
		
		this.createNostalgiaTabContentMenu=function()
		{
			$this.nostalgiaTabContentMenuSelect.bind('change',function() 
			{
				window.location=$(this).val();
			});
		};

		/******************************************************************/
		/******************************************************************/
		
		this.handleHash=function()
		{
			$this.currentHash=window.location.hash;	

			$(window).bind('hashchange',function(event) 
			{
				event.preventDefault();

				if($this.isEnable()==false) return;
				
				$this.currentHash=window.location.hash;
				$this.doHash();
				$this.previousHash=$this.currentHash;
			}); 
			
			if($this.currentHash!=$this.previousHash) $this.doHash();  
		};
		
		/******************************************************************/
		
		this.getPageComplete=function() 
		{
			if($this.tabContent!==false)
			{
				$this.open(false,{complete:function() 
				{
					api.nextSlide();
					$this.previousHash=$this.currentHash;
					$this.enable=true;
				}});
			}
			else $this.enable=true;  
		}
		
		/******************************************************************/
		
		this.doHash=function()
		{
			if(!$this.enable) return(false);
			if(!$this.checkHash()) return(false);
			
			var splittedHash = $this.currentHash.split("/");
			var splittedHashScroll = $this.currentHash.split("#");
			if($this.previousHash!='')
				var splittedHashPrevious = $this.previousHash.split("#");
			if(($this.previousHash=='' && splittedHashScroll.length==3 && $this.isOpen()) || ($this.previousHash!='' && splittedHashScroll.length==3 && splittedHashPrevious[0]+splittedHashPrevious[1]==splittedHashScroll[0]+splittedHashScroll[1]))
			{
				if($("#" + splittedHashScroll[2]).length && !((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)) || (navigator.userAgent.match(/iPad/i))||(navigator.userAgent.match(/Android/i))))
				{
					$this.destroyScrollbar();
					$this.scrollbar = $('#nostalgia-tab-content-scroll').jScrollPane({maintainPosition:true,autoReinitialise:false}).data('jsp');
					$this.scrollbar.scrollToElement($("#" + splittedHashScroll[2]), true);
				}
			}
			else
			{
				$this.enable=false;
				
				if($this.currentHash=='#!/main')
				{
					$(".menu-item-selected").removeClass("menu-item-selected");
					if($this.isOpen())
					{
						$this.close({complete:function() 
						{
							if($(".widgetControl").hasClass("inactive"))
								$(".widgetControl").trigger("click");
							$this.showNavigationMenu(false,{complete:function() 
							{
								$this.showNavigationClickHereBox(true);
								$this.showSupersizedSliderControl(true);
								$this.enable=true;
							}});
						}});
					}
					else
					{
						$this.showNavigationMenu(false,{complete:function() 
						{
							$this.showNavigationClickHereBox(true);
							$this.showSupersizedSliderControl(true);
							$this.enable=true;
						}});
					}

					return(true);
				}
				else if($this.currentHash=='#!/menu')
				{
					$(".menu-item-selected").removeClass("menu-item-selected");
					$this.showNavigationClickHereBox(false);
					$this.showNavigationMenu(true,{complete:function() 
					{
						$this.enable=true;
					}});
				
					return(true);
				}
				
				$this.showNavigationMenu(true);
				$this.showSupersizedSliderControl(false);
				
				//inside tab pagination
				if(typeof(splittedHash[2])!="undefined" && splittedHash[2].substr(0,4)=="page")
					return $this.getPage({ 
						name: (splittedHash[1].indexOf("#")!=-1 ? splittedHash[1].substr(0, splittedHash[1].indexOf("#")) : splittedHash[1]),
						paged: parseInt(splittedHash[2].split("-")[1])
					});
				//blog category
				else if(typeof(splittedHash[2])!="undefined" && splittedHash[2].substr(0,8)=="category")
				{
					var	data = {
						name: (splittedHash[1].indexOf("#")!=-1 ? splittedHash[1].substr(0, splittedHash[1].indexOf("#")) : splittedHash[1]),
						category_id: parseInt(splittedHash[2].split("-")[1])
					};
					if(typeof(splittedHash[3])!="undefined" && splittedHash[3].substr(0,4)=="page")
						data.paged = parseInt(splittedHash[3].split("-")[1]);
					return $this.getPage(data);
				}
				//child page pagination
				else if(typeof(splittedHash[2])!="undefined" && splittedHash[2]!="" && typeof(splittedHash[3])!="undefined" && splittedHash[3].substr(0,4)=="page")
				{
					var data = {
						name: (splittedHash[2].indexOf("#")!=-1 ? splittedHash[2].substr(0, splittedHash[2].indexOf("#")) : splittedHash[2]),
						parent_name: splittedHash[1],
						paged: parseInt(splittedHash[3].split("-")[1])
					};
					if($this.previousHash!='')
						data.type = 'get_comments';
					return $this.getPage(data);
				}
				//child page
				else if(typeof(splittedHash[2])!="undefined" && splittedHash[2]!="")
					return $this.getPage({
						name: (splittedHash[2].indexOf("#")!=-1 ? splittedHash[2].substr(0, splittedHash[2].indexOf("#")) : splittedHash[2]),
						parent_name: splittedHash[1]
					});
				$this.getPage({name: (splittedHash[1].indexOf("#")!=-1 ? splittedHash[1].substr(0, splittedHash[1].indexOf("#")) : splittedHash[1])});
			}
			return(true);
		};
		
		/******************************************************************/
		
		this.checkHash=function()
		{
			return($this.currentHash.substring(0,3)=='#!/' ? true : false);
		};
		
		/******************************************************************/
		/******************************************************************/
		
		this.open=function(forceOpen,event)
		{
			if(!$(".widgetControl").hasClass("inactive"))
				$(".widgetControl").trigger("click");
			var tabOpen=$this.isOpen();
			var tabToOpen=this.getPageProperty($this.currentHash,'tab');

			if((tabOpen===false) && (!forceOpen))
			{
				$this.moveNavigation(tabToOpen,{complete:function() { $this.open(true,event); }});
			}
			else
			{
				if(tabToOpen=='left')
				{
                                    // EDITADO POR VICTOR ESPINOSA
                                    
                                       mueveRedesSociales(tabToOpen);
                                    
                                    // FIN EDITADO POR VICTOR ESPINOSA
                                    
					if(tabOpen=='left')
					{
						$this.closeTab(tabOpen,{complete:function() 
						{
							$this.openTab(tabToOpen,{complete:function() { $this.doEvent(event); }});
						}});
					}
					else if(tabOpen=='right')
					{
						$this.closeTab(tabOpen,{complete:function() 
						{
							$this.moveNavigation(tabToOpen,{complete:function() 
							{ 
								$this.openTab(tabToOpen,{complete:function()  { $this.doEvent(event); }});						
							}});
						}});
					}
					else $this.openTab(tabToOpen,{complete:function() { $this.doEvent(event); }});						
				}
				else if(tabToOpen=='right')
				{
                                    
                                     // EDITADO POR VICTOR ESPINOSA
                                            mueveRedesSociales(tabToOpen);
                                    // FIN EDITADO POR VICTOR ESPINOSA
                                    
					if(tabOpen=='right')
					{
                                   
                                    
                                    
						$this.closeTab(tabOpen,{complete:function() 
						{
							$this.openTab(tabToOpen,{complete:function() { $this.doEvent(event); }});
						}});
					}
					else if(tabOpen=='left')
					{
						$this.closeTab(tabOpen,{complete:function() 
						{
							$this.moveNavigation(tabToOpen,{complete:function() 
							{ 
								$this.openTab(tabToOpen,{complete:function() { $this.doEvent(event); }});						
							}});
						}});
					}
					else $this.openTab(tabToOpen,{complete:function() { $this.doEvent(event); }});						
				}
			}
		};	
		
		/******************************************************************/
		
		this.close=function(event)
		{
			var tab=this.isOpen();
                        
			if(tab===false)
			{

				$this.moveNavigation(false,{complete:function() 
				{
					$this.showNavigationMenu(false,{complete:function() { $this.doEvent(event); }});
				}});
			}
			else
			{

				$this.closeTab(tab,{complete:function() 
				{
					$this.moveNavigation(false,{complete:function() 
					{
						$this.showNavigationMenu(false,{complete:function() { $this.doEvent(event); }});
					}});
				}});
			}
		};
		
		/******************************************************************/
		
		this.isOpen=function()
		{	
			if($this.nostalgiaTab.width()==0) {
                            
                            return(false)
                        };

			if($this.nostalgiaTab.hasClass('nostalgia-tab-left')) return('left');
			if($this.nostalgiaTab.hasClass('nostalgia-tab-right')) return('right');
			
			return(false);
		};
		
		/******************************************************************/
		/******************************************************************/
		
		this.openTab=function(tabToOpen,event)
		{
			$this.fillTab();
			
			//portfolio
			$('.nostalgia-accordion').accordion({
				icons:'',
				animated:'easeOutExpo',
				autoHeight:false,
				collapsible:true,
//				active:'h3.ui-state-active',
				active:'h3.ui-state-active',
    
				create: function(event, ui){
					$this.createScrollbar(true);
				},
				change: function(event, ui){
					$this.createScrollbar(true);
				}
			});
                        
			$('.fancybox-image:not(.fancybox-latest-portfolio)').attr("rel", "gallery");
			$('.fancybox-image:not(.fancybox-latest-portfolio)').fancybox({
				'titlePosition': 'inside'
			});
			/**************************************************************************/
			$('.fancybox-video:not(.fancybox-latest-portfolio)').bind('click',function() 
			{
				$("#jPlayer").jPlayer("stop");
				$(".jPlayerControl").addClass("inactive").removeClass("muted");
				$("#jPlayerPortfolio").jPlayer("stop");
				$(".audio-item").removeClass("playing");
				$.fancybox(
				{
					//'padding':0,
					'autoScale':false,
					'titlePosition': 'inside',
					'title': this.title,
					'transitionIn':'none',
					'transitionOut':'none',
					'width':(this.href.indexOf("vimeo")!=-1 ? 600 : 680),
					'height':(this.href.indexOf("vimeo")!=-1 ? 338 : 495),
					'href':(this.href.indexOf("vimeo")!=-1 ? this.href : this.href.replace(new RegExp("watch\\?v=", "i"), 'v/')),
					'type':(this.href.indexOf("vimeo")!=-1 ? 'iframe' : 'swf'),
					'swf':
					{
						'wmode':'transparent',
						'allowfullscreen':'true'
					}
				});

				return false;
			});
			/**************************************************************************/
			$(".fancybox-iframe:not(.fancybox-latest-portfolio)").fancybox({
				'width' : '75%',
				'height' : '75%',
				'autoScale' : false,
				'titleShow': false,
				'type' : 'iframe'
			});
			/**************************************************************************/
			$('a.fancybox-image:not(.fancybox-latest-portfolio) img,a.fancybox-video:not(.fancybox-latest-portfolio) img, .audio-item:not(.fancybox-latest-portfolio) img').each(function() 
			{
				$(this).attr('src',$(this).attr('src') + '?i='+getRandom(1,100000));
				$(this).bind('load',function() { $(this).parent('a').css('background-image','none'); $(this).fadeIn(1000); });
			});

			$this.setTabClass(tabToOpen);
			
			$this.showNavigation(tabToOpen);
			
			$this.nostalgiaTabContentMenuSelect.find('option[value="'+$this.currentHash+'"]').attr('selected','selected');

			if(tabToOpen=='left')
			{
				$this.nostalgiaTab.css({left:0,right:'auto'});
				$this.nostalgiaTab.animate({width:$this.nostalgiaTabWidth+'%'},{duration:1000,easing:'easeOutExpo',complete:function() 
				{
					$this.showTabIcon(true,tabToOpen,{complete:function() { $this.doEvent(event); }});
				}});					
			}
			else
			{
				$this.nostalgiaTab.css({left:'auto',right:0});
				$this.nostalgiaTab.animate({width:$this.nostalgiaTabWidth+'%'},{duration:1000,easing:'easeOutExpo',complete:function() 
				{
					$this.showTabIcon(true,tabToOpen,{complete:function() { $this.doEvent(event); }});
				}});					
			}
		};
		
		/******************************************************************/
		
		this.closeTab=function(tabToClose,event)
		{
			$("#jPlayerPortfolio").jPlayer("stop");
			$this.showTabIcon(false,tabToClose,{complete:function()
			{
				$(':input,a').qtip('destroy');
				$this.nostalgiaTab.animate({width:'0%'},{duration:1000,easing:'easeOutExpo',complete:function() 
				{
					$this.showNavigation(false);
					$this.doEvent(event);
				}});					
			}});
		};
		
		/******************************************************************/
		
		this.fillTab=function()
		{
			$('#nostalgia-tab-content-page').html($this.tabContent);
			var splittedHash = $this.currentHash.split("#");
			if(splittedHash.length==3 && $("#" + splittedHash[2]).length)
			{
				if(!((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)) || (navigator.userAgent.match(/iPad/i))||(navigator.userAgent.match(/Android/i))))
				{
					$this.scrollbar =  $('#nostalgia-tab-content-scroll').jScrollPane({maintainPosition:true,autoReinitialise:false}).data('jsp');
					$this.scrollbar.scrollToElement($("#" + splittedHash[2]), true);
				}
			}
			else
				$this.createScrollbar(false);
		};
		
		/******************************************************************/
		
		this.setTabClass=function(tabToOpen)
		{
			var className=$this.getPageProperty($this.currentHash,'className');
			
			$this.resetTabClass();
			
			$this.nostalgiaTab.addClass('nostalgia-tab-'+tabToOpen);
			$this.nostalgiaTab.addClass($this.currentTabClass);
			$this.nostalgiaTabIcon.addClass('nostalgia-tab-icon-'+className);
                        
                        
                        
                        
		};
		
		/******************************************************************/
		
		this.resetTabClass=function()
		{
			$this.nostalgiaTab.attr('class','');
			$this.nostalgiaTabIcon.attr('class','');
			$this.nostalgiaTabIcon.css({left:'',right:''});
                        

		};
		
		/******************************************************************/
		
		this.showTabIcon=function(show,tab,event)
		{
			var option;
			var position=-1*$this.nostalgiaTabIconWidth;
			
			if(show) option=tab=='left' ? {'left':0} : {'right':0};
			else option=tab=='left' ? {'left':position} : {'right':position};

			$this.nostalgiaTabIcon.animate(option,{duration:300,complete:function() { $this.doEvent(event); }});
		};

		/******************************************************************/
		/******************************************************************/
		
		this.showNavigation=function(tabToOpen)
		{
			var tab=tabToOpen ? tabToOpen : $this.isOpen();
			var width=$this.getWindowWidth();

			if(width<$this.breakpoint[1])
			{
				if(tab) 
				{	
                                    
					$this.nostalgiaNavigation.css('display','none');
					$this.nostalgiaNavigation.css({left:$this.nostalgiaNavigationStartLeftPosition+'%',right:'auto'});
                                        
                                        return;
                                        
				}
			}
			
			$this.nostalgiaNavigation.css('display','block');
                        
		}
		
		/******************************************************************/
		
		this.showNavigationMenu=function(show,event)
		{
			if(show)
			{
				$this.nostalgiaNavigationMenu.animate({height:$this.nostalgiaNavigationMenuHeight},{duration:500,complete:function() 
				{
					$this.doEvent(event);
				}});

			}			
			else
			{

				$this.nostalgiaNavigationMenu.animate({height:'0'},{duration:500,complete:function()  
				{
					$this.doEvent(event);
				}});	
                         
                         
			}
		};
		
		/******************************************************************/
		
		this.moveNavigation=function(tabToOpen,event)
		{
			$this.showNavigationClickHereBox(false);
			$this.showSupersizedSliderControl(false);
			
			if($this.getWindowWidth()<$this.breakpoint[1]) 
			{	
				$this.showNavigation();
				$this.doEvent(event);
				return;
			}
			
			var position=$this.getNostalgiaNavigationPosition(tabToOpen);
			
			if(tabToOpen=='left')
			{
				$this.nostalgiaNavigation.css({right:'auto',left:position.left+'%'});
				$this.nostalgiaNavigation.animate({left:$this.nostalgiaTabWidth+$this.nostalgiaTabMargin+'%'},{duration:1000,complete:function() { $this.doEvent(event); }});
			}
			else if(tabToOpen=='right')
			{
				$this.nostalgiaNavigation.css({right:position.right+'%',left:'auto'});
				$this.nostalgiaNavigation.animate({right:$this.nostalgiaTabWidth+$this.nostalgiaTabMargin+'%'},{duration:1000,complete:function()  { $this.doEvent(event); }});
			}
			else
			{
				if(position.left==$this.nostalgiaNavigationStartLeftPosition) $this.doEvent(event);
				else
				{
					$this.nostalgiaNavigation.css({right:'auto',left:position.left+'%'});
					$this.nostalgiaNavigation.animate({left:$this.nostalgiaNavigationStartLeftPosition+'%'},{duration:1000,complete:function() { $this.doEvent(event); }});
				}
			}
		};

		/******************************************************************/
		/******************************************************************/

		this.getPageProperty=function(hash,property)
		{
			var splittedHash = hash.split("/");
			var val=$this.page[splittedHash[1]][property];
			if(typeof(val)!='undefined') return(val);

			return($this.options[property]);
		};
		
		/******************************************************************/
		
		this.getPage=function(data)
		{
			data.action = 'theme_get_content';
			$(".menu-item-selected").removeClass("menu-item-selected");
			$(".nostalgia-menu-item-" + data.name).addClass("menu-item-selected");
			if(!$(".nostalgia-menu-item-" + data.name).length)
				$(".nostalgia-menu-item-" + data.parent_name).addClass("menu-item-selected");

			$.get(config.ajaxurl, data ,function(json)
			{
				if(data.type=='get_comments')
				{
					$("#comments").html(json.html);
					$this.createScrollbar(true);
					$this.enable=true;
				}
				else
				{
					$this.tabContent=json.html;
					$this.currentTabClass = 'nostalgia-tab-' + (!$(".nostalgia-menu-item-" + data.name).length ? data.parent_name : data.name);
					$this.getPageComplete();
				}
			},
			'json').error(function() 
			{ 
				$this.tabContent=false;
				$this.getPageComplete();
			});
			return false;
		};

		/******************************************************************/
		
		this.createScrollbar=function(maintainPosition)
		{
			if(!((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)) || (navigator.userAgent.match(/iPad/i))||(navigator.userAgent.match(/Android/i))))
			{
				if(maintainPosition)
				{
					$this.scrollbar =  $('#nostalgia-tab-content-scroll').jScrollPane({maintainPosition:maintainPosition,autoReinitialise:false}).data('jsp');
					$this.scrollbar.reinitialise();
				}
				else
					$this.scrollbar=$('#nostalgia-tab-content-scroll').jScrollPane({maintainPosition:maintainPosition,autoReinitialise:false}).data('jsp');
			}
		};
		
		/******************************************************************/
		
		this.destroyScrollbar=function()
        {
            if($this.scrollbar!='') 
            {
                $this.scrollbar.destroy();
                $this.scrollbar='';
            };              
        };
		
		/******************************************************************/
		
		this.createSupersizedSlider=function()
		{	
			$.supersized({autoplay:parseInt(config.autoplay),slides:$this.slide,thumbnail_navigation:false,thumb_links:false,transition:config.transition,transition_speed:config.transition_speed,slide_interval:config.slide_interval});					
		};
		
		/******************************************************************/
		
		this.showSupersizedSliderControl=function(show)
		{
			$this.supersizedControl.css('display',(show ? 'block' : 'none'));
		};
		
		/******************************************************************/
		
		this.showNavigationClickHereBox=function(show)
		{
			$this.nostalgiaNavigationClickHereBox.css('display',(show ? 'block' : 'none'));
		};
		
		/******************************************************************/
		
		this.createStartPrealoder=function(data)
		{
			var i=0;
			var count=$this.slide.length;

			var list=$(document.createElement('ul')).attr('class','no-list box-center')
	
			$this.startPreloader.find('div:first').prepend(list);
			$this.blink($this.startPreloader.find('p'));
						
			$($this.slide).each(function(index) 
			{			
				var image=$(document.createElement('img'));	
				var element=$(document.createElement('li'));
				
				list.append(element);

				image.attr('src',$this.slide[index].image + ($.browser.msie ? '?i='+getRandom(1,10000) : ''));

				$(image).bind('load',function() 
				{
					element.animate({opacity:1},100,function() 
					{
						if((++i)==count) data.complete.apply();
					});
				});
			});
		};
		
		/******************************************************************/
		
		this.createMenuSlider=function()
		{
			if($this.nostalgiaNavigationMenuList.children().length>config.menu_count)
				$this.nostalgiaNavigationMenuList.bxSlider(
				{
					auto:false,
					pause:500,
					nextText:null,
					prevText:null,
					mode:'vertical',
					displaySlideQty:config.menu_count,
					infiniteLoop:true,
					hideControlOnEnd:false,
					wrapperClass:'bx-wrapper bx-wrapper-nostalgia-navigation-menu'
				});					
		};

		/******************************************************************/
		
		this.blink=function(element)
		{
			$(element).animate({opacity:($(element).css('opacity')==1 ? 0.2 : 1)},500,function() {$this.blink($(this));});
		};
		
		/******************************************************************/
		
		this.isEnable=function()
		{
			if(!$this.enable)
			{
				if($this.previousHash!='')
					window.location.href=$this.previousHash;
				return(false);
			}  
			
			return(true);
		};
		
		/******************************************************************/
		
		this.doEvent=function(event)
		{
			if(typeof(event)!='undefined')
			{
				if(typeof(event.complete)!='undefined') event.complete.apply();
			};                  
		};
		
		/******************************************************************/
		
		this.getWindowWidth=function()
		{
			return($(window).width());
		};
		
		/******************************************************************/
		
		this.getNostalgiaNavigationPosition=function(tabToOpen)
		{
			var windowWidth=$this.getWindowWidth();
			var navigationWidth=$this.nostalgiaNavigation.width();
			
			var left=$this.nostalgiaNavigation.position().left;
			var right=$this.nostalgiaNavigation.position().right;

			if(tabToOpen=='right') 
			{
				if(typeof(left)!='undefined')
					right=((windowWidth-left-navigationWidth)/windowWidth)*100;
				else right=(right/windowWidth)*100;
			}
			else 
			{
				if(typeof(right)!='undefined')
					left=((windowWidth-right-navigationWidth)/windowWidth)*100;
				else left=(left/windowWidth)*100;
			}

			return({left:left,right:right});
		};
		
		/******************************************************************/
		
		this.setPosition=function()
		{
			var tab=$this.isOpen();
			var width=$this.getWindowWidth();
			
			/***/
			
			$this.showNavigation();	
			
			if(width<$this.breakpoint[0])
				$this.supersizedControl.css('width', ($('.jPlayerControl').length ? '337px' : '300px'));
			else
				$this.supersizedControl.css('width', ($('.jPlayerControl').length && $('.widgetControl').length ? '374px' : ($('.jPlayerControl').length || $('.widgetControl').length ?  '337px' : '300px')));
			
			if(width>$this.breakpoint[1])
			{
				$this.nostalgiaTabWidth=50;

				if(tab)
				{
					$this.nostalgiaTab.css('width',$this.nostalgiaTabWidth+'%');
					$this.nostalgiaNavigation.css(tab,$this.nostalgiaTabWidth+$this.nostalgiaTabMargin+'%');
					$this.nostalgiaNavigation.css(tab=='left' ? 'right' : 'left','auto');
				}
			}
			
			/***/
			
			if((width<=$this.breakpoint[1]) && (width>=$this.breakpoint[2]))
			{
				$this.nostalgiaTabWidth=60;

				if(tab)
				{
					$this.nostalgiaTab.css('width',$this.nostalgiaTabWidth+'%');
					$this.nostalgiaNavigation.css(tab,$this.nostalgiaTabWidth+$this.nostalgiaTabMargin+'%');
					$this.nostalgiaNavigation.css(tab=='left' ? 'right' : 'left','auto');					
				}
			}
			
			/***/
			
			if(width<$this.breakpoint[2])
			{
				$this.nostalgiaTabWidth=80;
				
				if(tab)
				{
					$this.nostalgiaNavigation.css('display','none');	
					$this.nostalgiaTab.css('width',$this.nostalgiaTabWidth+'%');
				}
			}
			
			/***/
			
			if(width<$this.breakpoint[3])
			{
				$this.nostalgiaTabWidth=100;
				if(tab)
				{
					$this.nostalgiaTab.css('width',$this.nostalgiaTabWidth+'%');
				}	
			}
		};
		
		/******************************************************************/
	};

	/**************************************************************/
	 
	$.fn.nostalgia=function(options,page,slide)
	{
		/***********************************************************/

		var nostalgia=new Nostalgia(options,page,slide);
		nostalgia.load();

		/***********************************************************/
	};
	
	/**************************************************************/
        
        // EDITADO POR VICTOR ESPINOSA

	function mueveRedesSociales(tipo){
                                   
                                   clase = (tipo!="left")?"_rsDerecha":"_rsIzquierda"
                                   
                                    $("#_rsBengalaWrapp").fadeOut(500, function(){
                                    $("#_rsBengalaWrapp").attr("class","");
                                    $("#_rsBengalaWrapp").addClass(clase);
                                    $("#_rsBengalaWrapp").fadeIn(3000);
                                    })
                                     
                                    }
                                    
                              
})(jQuery);

