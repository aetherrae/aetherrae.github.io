// appel fadeImgUp
$(document).ready(function(){
	$(".fadeImgUp").fadeTo("fast", 0.4); // This sets the opacity of the thumbs to fade up to 40% when the page loads
	$(".fadeImgUp").hover(function(){
		$(this).fadeTo("fast", 1.0); // This should set the opacity to 100% on hover
	},
	function(){
		$(this).fadeTo("fast", 0.4); // This should set the opacity back to 30% on mouseout
   });
});

// appel fadeImgDown
$(document).ready(function(){
	$(".fadeImgDown").fadeTo("slow", 1.0); // This sets the opacity of the thumbs to fade down to 60% when the page loads
	$(".fadeImgDown").hover(function(){
		$(this).fadeTo("slow", 0.4); // This should set the opacity to 100% on hover
	},
	function(){
		$(this).fadeTo("slow", 1.0); // This should set the opacity back to 30% on mouseout
   });
});

/*// appel highslide
$(document).ready(function(){
	hs.graphicsDir = 'js/highslide/graphics/';
	hs.align = 'center';
	hs.transitions = ['expand', 'crossfade'];
	hs.numberPosition = 'caption';
	hs.wrapperClassName = 'wide-border floating-caption controls-in-heading';
	hs.fadeInOut = true;
	hs.dimmingOpacity = .75;
	//hs.outlineType = 'square-white';
	hs.outlineType = 'glossy-dark';

	// Add the controlbar
	if (hs.addSlideshow) hs.addSlideshow({
		interval: 5000,
		repeat: false,
		useControls: true,
		fixedControls: 'fit',
		overlayOptions: {
			className: 'large-dark',
			opacity: .6,
			position: 'center',
			hideOnMouseOut: true
		}
	});
});*/


function header() {
	//codeHtml = '<a href="index.html"><div id="logo_nom_1"><style="color:blue">AETHERAJ</style><style="color:red"> Studio</style></div></a>';
	codeHtml = '<a href="index.html"><div id="logo_nom"></div></a>';
	codeHtml+= '<hr id="hr_menu"/>';
	codeHtml+= '<div id="nav_menu">';
	codeHtml+= '<a href="photographie.html"><div class="fadeImgUp" style="display: inline;">PHOTOGRAPHIE</div></a>';
	codeHtml+= '&nbsp;•&nbsp;';
	codeHtml+= '<a href="matos.html"><div class="fadeImgUp" style="display: inline;">MAT&Eacute;RIEL</div></a>';
	/*codeHtml+= '&nbsp;•&nbsp;';
	codeHtml+= '<a href="divers.html"><div class="fadeImgUp" style="display: inline;">DIVERS</div></a>'; */
	codeHtml+= '</div>';
	document.getElementById('header').innerHTML = codeHtml;
	document.title = "Aetherra Visuals";
}


let lightboxOpen = false;
function buildGallery() {
	const container = document.getElementById('gallery');
	container.innerHTML = ''; // Nettoyer le container
	// ✅ Ne pas détruire si la lightbox est ouverte


	const spacing = 10; // Espace fixe entre les images
	const rowHeight = 187; // Hauteur cible maximum
	const border = 2; // Bordure de 2px dans le css
	const containerWidth = container.clientWidth;
	
	let row = [];
	let aspectRatioSum = 0;
	
	images.forEach((image, index) => {
		const aspectRatio = image.width / image.height;
		row.push({ ...image, aspectRatio });
		aspectRatioSum += aspectRatio;
		
		const totalSpacing = spacing * (row.length - 1);
		const totalBorders = row.length * 2 * border; // une bordure à gauche et droite par image
		const estimatedHeight = (containerWidth - totalSpacing - totalBorders) / aspectRatioSum;
		
		if (estimatedHeight < rowHeight || index === images.length - 1) {
			const rowDiv = document.createElement('div');
			rowDiv.className = 'image-row';
			
			// Limite de hauteur si dernière ligne
			const finalHeight = (index === images.length - 1) ? Math.min(estimatedHeight, rowHeight) : estimatedHeight;
			
			row.forEach(image => {
				const link = document.createElement("a");
				const imgFull = 'gallery/' + image.src;
				const imgThumb = 'gallery/thumb/' + image.src;
				link.href = imgFull;
				link.dataset.src = imgFull;
				link.dataset.subHtml = `<h4>${image.subhtml}</h4>`;
				link.className = "gallery-item";
				
				const img = document.createElement('img');
				const width = image.aspectRatio * finalHeight;
				img.src = imgThumb;
				img.style.estimatedHeight = `${finalHeight}px`;
				img.style.width = `${width}px`;
				link.appendChild(img);
				
				rowDiv.appendChild(link);
			});
			
			container.appendChild(rowDiv);
			row = [];
			aspectRatioSum = 0;
		}
	});
	
	lightGallery(container, {
		selector: '.gallery-item',
		speed: 200,
		mode: 'lg-fade',
		// ✅ Écoute des événements via le paramètre `event`
  event: {
    onAfterOpen: () => {
      lightboxOpen = true;
    },
    onAfterClose: () => {
      lightboxOpen = false;
    }
  }
	});
	

}