<?php get_sidebar('post-top'); ?>
<div <?php post_class("post"); ?>>
	<?php
	if($parent)
	{	
		global $parent_url;
		$parent_url = "#!/" . $parent->post_name;
	}
	?>
	<ul class="bread_crum clear-fix">
		<?php
		if($parent)
		{
		?>
		<li>
			<h3>
				<a href="<?php echo $parent_url;?>" title="<?php echo $parent->post_title;?>"><?php echo $parent->post_title;?></a>
			</h3>
		</li>
		<li class="separator">&nbsp;</li>
		<?php
		}
		?>
		<li>
			<span><?php the_title();?></span>
		</li>
		<li class="date">
			<span><span class="month"><?php the_time('m'); ?></span><?php the_time('d'); ?></span>
		</li>
	</ul>
	<div class="post-image clear-fix">
		<?php 
		if(has_post_thumbnail()):
		$attachment_image = wp_get_attachment_image_src(get_post_thumbnail_id(get_the_ID()), "large");
		$large_image_url = $attachment_image[0];
		?>
		<a href="<?php echo $large_image_url; ?>" title="" class="fancybox-image">
			<?php the_post_thumbnail("blog-post-thumb", array("alt" => get_the_title(), "title" => "")); ?>
			<span></span>
		</a>
		<?php endif; ?>
		<div class="caption clear-fix">
			<span class="category icon-2 icon-2-4">
				in 
				<?php $categories = get_the_category();
				foreach($categories as $key=>$category)
				{
					echo '<a href="' . $parent_url . '/category-' . $category->term_id . '/" ';
					if(empty($category->description))
						echo 'title="' . sprintf(__('View all posts filed under %s', 'prestige'), $category->name) . '"';
					else
						echo 'title="' . esc_attr(strip_tags(apply_filters('category_description', $category->description, $category))) . '"';
					echo '>' .$category->name . '</a>' . ($key+1<count($categories) ? ', ' : '');
				}?>
			</span>
			<span class="comment icon-2 icon-2-6">
				this entry has <a href="<?php echo $parent_url; ?>/<?php global $post; echo $post->post_name;?>#comments" title="<?php comments_number(); ?>"><?php comments_number(); ?></a>
			</span>
			<span class="author icon-2 icon-2-5">
				by <span class="highlight"><?php the_author();?></span>
			</span>
		</div>
		<?php the_content(); ?>
		<?php
		if(comments_open()):
		?>
		<div id="comments">
		<?php
		comments_template();
		?>
		</div>
		<?php
		require_once("comments-form.php");
		endif; ?>
	</div>
</div>
<?php get_sidebar('post-bottom'); ?>