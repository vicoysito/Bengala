<?php
/*
Template Name: Blog
*/
global $themename;
?>
<?php
the_content();
global $parent_url, $post;

$parent_url = "#!/" . $post->post_name;
$post_categories = array_values(array_filter((array)get_post_meta(get_the_ID(), $themename . "_blog_categories", true)));
if(!count($post_categories))
	$post_categories = get_terms("category", "fields=ids");
if(count($post_categories))
{
	?>
	<div class="layout-50 clear-fix">
		<?php
		require_once("blog-category-walker.php");
		?>
		<div class="layout-50-left">
			<ul class="blog-category-list">
				<li>
					<a <?php if((int)$_GET["category_id"]==0): ?> class="category-selected" <?php endif;?> href="<?php echo $parent_url; ?>/category-all/" title="<?php _e("Show all posts", $themename); ?>">
						<?php _e("General", $themename); ?>
						<?php
						//count all posts
						query_posts(array( 
							'post_type' => 'post',
							'post_status' => 'publish',
							'posts_per_page' => -1,
							'cat' => implode(",", $post_categories)
						));
						global $wp_query;
						$post_count = $wp_query->post_count;
						?>
						<strong>[<?php echo $post_count; ?>]</strong>
					</a>
				</li>
		<?php
		if(count($post_categories)>1):
		wp_list_categories(array(
			"title_li" => "",
			"show_count" => 1,
			"include" => implode(",", array_slice($post_categories, 0, floor(count($post_categories)/2))),
			"parent_url" => $parent_url,
			"walker" => new Blog_Category_Walker()
		));
		endif;
		?>
			</ul>
		</div>
		<div class="layout-50-right">
			<ul class="blog-category-list">
		<?php
		wp_list_categories(array(
			"title_li" => "",
			"show_count" => 1,
			"include" => implode(",", array_slice($post_categories, floor(count($post_categories)/2), count($post_categories))),
			"parent_url" => $parent_url,
			"walker" => new Blog_Category_Walker()
		));
		?>
			</ul>
		</div>
	</div>
	<?php
}
query_posts(array( 
	'post_type' => 'post',
	'post_status' => 'publish',
	'posts_per_page' => 5,
	'cat' => ((int)$_GET["category_id"]>0 ? (int)$_GET["category_id"] : implode(",", $post_categories)),
	'paged' => (int)$_GET["paged"],
	'order' => get_post_meta(get_the_ID(), $themename . "_blog_order", true)
));
get_sidebar('blog-top');
?>
<ul class="blog-list">
<?php
if(have_posts()) : while (have_posts()) : the_post();
?>
	<li <?php post_class("blog-list-post"); ?>>
		<div class="blog-list-post-header clear-fix">
			<h3>
				<a href="<?php echo $parent_url; ?>/<?php echo $post->post_name;?>" title="<?php the_title();?>">
					<?php the_title(); ?>
				</a>
			</h3>
			<span><span class="month"><?php the_time('m'); ?></span><?php the_time('d'); ?></span>
		</div>
		<div class="blog-list-post-image clear-fix">
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
					this entry has <a href="<?php echo $parent_url; ?>/<?php echo $post->post_name;?>#comments" title="<?php comments_number(); ?>"><?php comments_number(); ?></a>
				</span>
				<span class="author icon-2 icon-2-5">
					by <span class="highlight"><?php the_author();?></span>
				</span>
			</div>
		</div>
		<p class="blog-list-post-content clear-fix">
			<?php the_excerpt_rss(); ?>
			<br/>
			<a class="read-more" href="<?php echo $parent_url; ?>/<?php echo $post->post_name;?>" title="<?php _e("Read more", $themename);?>">
				<?php _e("Read more", $themename);?>
			</a>
		</p>
	</li>
<?php
endwhile; endif;
require_once("pagination.php");
kriesi_pagination('', 2, $parent_url);
//Reset Query
wp_reset_query();
?>
</ul>
<?php get_sidebar('blog-bottom');?>