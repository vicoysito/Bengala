<?php get_header(); ?>
<!-- Navigation -->
<div id="nostalgia-navigation">
	<div id="nostalgia-navigation-menu">
		<?php
		$params = array();
		$result = theme_get($params);
		if($result["custom_css"]!=''):
		?>
		<style type="text/css">
			<?php echo $result["custom_css"]; ?>
		</style>
		<?php
		endif;
		?>
		<!-- Menu -->
		<ul class="clear-fix">
			<?php
			echo $result["html"];
			?>
		</ul>
		<!-- Music control -->
		<?php if(count($theme_options["tracks"])): ?>
		<a href="#" class="jPlayerControl<?php echo (!$theme_options["music_autoplay"] ? " inactive" : ""); ?>"></a>
		<?php endif; ?>
		<!-- /Music control -->
		<!-- /Menu -->
		<a href="#!/main" id="nostalgia-navigation-close-button"></a>
	</div>
	<!-- Name box -->
	<div id="nostalgia-navigation-name-box">
		<?php echo $theme_options["main_box_text"]; ?>
        </div>


     
        
	<!-- /Name box -->
	<div id="nostalgia-navigation-click-here-box"></div>
</div>

<!-- EDITADO POR VICTOR ESPINOSA -->
<!-- CAJA PARA REDES SOCIALES BENGALA -->
<div id="_rsBengalaWrapp" class="_rsIzquierda">
    <a href="http://www.facebook.com/casabengala.tv" target="_blank"><div class="rsBengala _Rsfb"></div></a>
    <a href="http://twitter.com/casabengala" target="_blank"><div class="rsBengala _Rstw"></div></a>
    <a href="http://twitter.com/casabengala" target="_blank"><div class="rsBengala _Rsin"></div></a>
        <a href="http://vimeo.com/casabengala" target="_blank"><div class="rsBengala _Rsvi"></div></a>
    
</div>

<!-- /Navigation -->
<!-- Widget area -->
<?php
if(is_active_sidebar('home-left') || is_active_sidebar('home-right')):
?>
<div class="sidebar-home"<?php if(!(int)$theme_options["display_home_widget_on_start"]): ?> style="display: none;"<?php endif; ?>>
<?php
if(is_active_sidebar('home-left')):

//EDITADO POR VICTOR ESPINOSA
//<script>
//alert("izquierdo")
//</script>


?>
<ul class="sidebar-home-left">
<?php
	get_sidebar('home-left');
?>
</ul>
<?php
endif; 
?>
<?php
if(is_active_sidebar('home-right')):
?>

<ul class="sidebar-home-right">
<?php
	get_sidebar('home-right');
?>
</ul>

<?php
endif;
?>
</div>
<?php
endif;
?>
<!-- Widget area -->
<!-- Tab -->
<div id="nostalgia-tab">
	<!-- Tab icon -->
	<div id="nostalgia-tab-icon"></div>
	<!-- /Tab icon -->
	<!-- Content -->
	<div id="nostalgia-tab-content">
		<form name="nostalgia-tab-content-menu" id="nostalgia-tab-content-menu" method="post" action="">
			<div>
				<select id="nostalgia-tab-content-menu-select" name="nostalgia-tab-content-menu-select">
					<?php
					$params = array(
						'type' => 'dropdown'
					);
					$result = theme_get($params);
					echo $result["html"];
					?>
					<option value='#!/main'><?php _e('Close', $themename); ?></option>
				</select>
			</div>
		</form>
		<!-- Scroll section -->
		<div id="nostalgia-tab-content-scroll">
			<div id="nostalgia-tab-content-page">
				<!-- Page content -->
			</div>
		</div>
		<!-- /Scroll section -->
		<!-- Footer -->		
		<div id="nostalgia-tab-footer" class="clear-fix">
			<?php 
			$arrayEmpty = true;
			for($i=0; $i<count($theme_options["icons"]["type"]); $i++)
			{
				if($theme_options["icons"]["type"][$i]!="")
					$arrayEmpty = false;
			}
			if(!$arrayEmpty):
			?>
			<ul class="no-list social-list">
				<?php
				for($i=0; $i<count($theme_options["icons"]["type"]); $i++)
				{
					if($theme_options["icons"]["type"][$i]!=""):
				?>
				<li><a href="<?php echo $theme_options["icons"]["value"][$i];?>" class="social-<?php echo $theme_options["icons"]["type"][$i]; ?>"></a></li>
				<?php
					endif;
				}
				?>
			</ul>
			<?php endif; ?>
			<?php if($theme_options["footer_text_left"]!="" ||  $theme_options["footer_text_right"]!=""): ?>
			<div class="nostalgia-tab-footer-caption">
				<?php if($theme_options["footer_text_left"]!=""): ?>
				<span class="float-left"><?php echo $theme_options["footer_text_left"]; ?></span>
				<?php endif; ?>
				<?php if($theme_options["footer_text_right"]!=""): ?>
				<span class="float-right"><?php echo $theme_options["footer_text_right"]; ?></span>
				<?php endif; ?>
			</div>
			<?php endif; ?>
		</div>
		<!-- /Footer -->
	</div>
	<!-- /Content -->
</div>
<!-- /Tab -->
<?php get_footer(); ?>