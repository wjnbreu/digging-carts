$ ->
	composerObject = {}
	videoObject = {}
	mixObject = {}
	additionalVideoObject = {}
	magazineObject = {}
	player2 = {}
	initCount = 0
	converter = new Showdown.converter()
	player = {}
	videoPlayer = {}
	APIModules = {}
	modVP = {}
	vidRatio = 640 / 360
	targetVideo = {}
	playerTemplate = ""
	currentCountry = ""
	colorFlag = 0
	captionsOn = false

	currentBCVideo = {}

	#is video playing?
	videoPlaying = false

	#storage for video progress
	videoPosition = 0

	brightcoveVideos = []

	isMobile = false

	#DEFAULT ENGLISH
	playerData = {}

	playerIDS = {
		# FINAL
		"spanish" : "3765246987001",
		#FINAL
		"french" : "3766692412001",
		#FINAL
		"polish" : "3765246988001",
		#NOT FINAL / DEFAULT
		"italian" : "3763075412001",
		#FINAL
		"japanese" : "3779128119001",
		#FINAL
		"brazilian" : "3766692411001",
		#FINAL
		"turkish" : "3765246989001",
		#FINAL
		"default" : "3763075412001"
	}

	specialCountries = ['spain', 'mexico', 'chile', 'argentina', 'france', 'poland', 'italy', 'turkey', 'japan', 'colombia', 'brazil']



	init = ->
		setupBinds()
		#Brightcove
		addPlayer()
		# $('.video-nav ul a.episode li').first().addClass "active"
		# $('.story-nav ul a.additional-episode li').first().addClass "active"
		sendHeight(getHeight())
		

	prepInit = (count) ->
		initCount = initCount + count
		#make sure all data is done before calling init
		if initCount == 6
			removeSpinner()
			init()
			initCount = 0


	findLocation = ->
		$.ajax 'http://freegeoip.net/json/',
			type: 'GET',
			dataType: 'json',
			timeout: 3000,
			error: (jqXHR, textStatus, errorThrown) ->
				console.log "#{textStatus}"
				currentCountry = "default"
				getData()
				updateInitPlayerData(playerIDS.default, currentCountry)
			success: (data, textStatus, jqXHR) ->
				currentCountry = data.country_name
				console.log "Country: #{currentCountry}"
				currentCountry = currentCountry.toLowerCase()


				#TAKE OUT
				if currentCountry == 'japan'
					captionsOn = true
					$('#caption-toggle .captions').addClass "active"
					$('#caption-toggle .captions-text').addClass("active").empty().text('Subtitles On')
				

				getData()
				updateInitPlayerData(playerIDS.default, currentCountry)


	
	updateInitPlayerData = (videoId, country) ->
		if currentCountry == 'japan'
			videoId = playerIDS.japanese
		playerData = {
			"playerID" : "1890493041001",
			"playerKey" : "AQ~~%2CAAABuJ3Komk~%2CgXybzBdQzgLgC0zHvAZXtMeryIVplW-t",
			"width" : ($(window).width()) / 1.5,
			"height" : (($(window).width()) / 1.5) / vidRatio,
			"videoID" : "#{videoId}"
		}
		playerTemplate = "<div style=\"display:none\"></div><object id=\"myExperience\" class=\"BrightcoveExperience\"><param name=\"bgcolor\" value=\"#FFFFFF\" /><param name=\"width\" value=\"{{width}}\" /><param name=\"height\" value=\"{{height}}\" /><param name=\"playerID\" value=\"{{playerID}}\" /><param name=\"playerKey\" value=\"{{playerKey}}\" /><param name=\"isSlim\" value=\"true\" /><param name=\"autoStart\" value=\"false\" /><param name=\"isVid\" value=\"true\" /><param name=\"isUI\" value=\"true\" /><param name=\"dynamicStreaming\" value=\"true\" /><param name=\"@videoPlayer\" value=\"{{videoID}}\"; /><param name=\"includeAPI\" value=\"true\" /><param name=\"linkBaseURL\" value=\"http://www.redbullmusicacademy.com/magazine/diggin-in-the-carts\"/><param name=\"templateLoadHandler\" value=\"onTemplateLoad\" /><param name=\"templateReadyHandler\" value=\"onTemplateReady\" /></object>"
		currentCountry = country.toLowerCase()
		
		#show captions if country is "special"
		if specialCountries.indexOf(currentCountry) > -1
			$('.captions').show()
			$('.captions-text').show()
		



	sendHeight = (height) ->
		message = {height: height}
		messageJSON = JSON.stringify(message)
		return window.parent.postMessage(messageJSON, '*')

	getHeight = ->
		return $(document.body).height()

	addPlayer = ->
		template = Handlebars.compile(playerTemplate)
		playerHTML = template(playerData)

		document.getElementById('player').innerHTML = playerHTML

		#instantiate player
		brightcove.createExperiences()

	window.onTemplateLoad = (experienceID) ->
		player = brightcove.api.getExperience(experienceID)
		APIModules = brightcove.api.modules.APIModules
		modVP = player.getModule(brightcove.api.modules.APIModules.VIDEO_PLAYER)
		makeCaptionOverlay()
		

	window.onTemplateReady = (evt) ->
		videoPlayer = player.getModule(APIModules.VIDEO_PLAYER)
		resizePlayer($('#myExperience'))
		modVP.addEventListener(brightcove.api.events.MediaEvent.BEGIN, onMediaEventFired)
		modVP.addEventListener(brightcove.api.events.MediaEvent.CHANGE, onMediaEventFired)
		modVP.addEventListener(brightcove.api.events.MediaEvent.COMPLETE, onMediaEventFired)
		modVP.addEventListener(brightcove.api.events.MediaEvent.ERROR, onMediaEventFired)
		modVP.addEventListener(brightcove.api.events.MediaEvent.PLAY, onMediaEventFired)
		#modVP.addEventListener(brightcove.api.events.MediaEvent.PROGRESS, onMediaProgressFired)
		modVP.addEventListener(brightcove.api.events.MediaEvent.STOP, onMediaEventFired)
		sendHeight(getHeight())
		

	#caption toggle
	$('#caption-toggle').click (event) ->
		#THIS NEEDS TO KNOW WHAT VIDEO YOU ARE ON
		event.stopPropagation()
		event.preventDefault()
		order = $(this).data('order')
		targetVideo = videoObject[order]
		
		if $(this).hasClass "unreleased"
			return
		else
			if captionsOn
				captionsOn = false
				$('#caption-toggle .captions').removeClass "active"
				$('#caption-toggle .captions-text').removeClass("active").empty().text('Subtitles Off')

				videoPlayer.loadVideoByID(playerIDS.default)

			else if !captionsOn
				captionsOn = true
				$('#caption-toggle .captions').addClass "active"
				$('#caption-toggle .captions-text').addClass("active").empty().text('Subtitles On')
				switch currentCountry
						#FRENCH
					when "france" then videoPlayer.loadVideoByID(targetVideo.fields.brightcoveVideoIdFrench)
					#JAPANESE
					when "japan" then videoPlayer.loadVideoByID(targetVideo.fields.brightcoveVideoIdJapanese)
					#TURKISH
					when "turkey" then videoPlayer.loadVideoByID(targetVideo.fields.brightcoveVideoIdTurkish)
					#BRAZIL
					when "brazil" then videoPlayer.loadVideoByID(targetVideo.fields.brightVideoIdBrazil)
					#ITALIAN
					when "italy" then videoPlayer.loadVideoByID(targetVideo.fields.brightcoveVideoIdItalian)
					#SPANISH
					when "spain" then videoPlayer.loadVideoByID(targetVideo.fields.brightcoveVideoIdSpanish)
					when "mexico" then videoPlayer.loadVideoByID(targetVideo.fields.brightcoveVideoIdSpanish)
					when "argentina" then videoPlayer.loadVideoByID(targetVideo.fields.brightcoveVideoIdSpanish)
					when "colombia" then videoPlayer.loadVideoByID(targetVideo.fields.brightcoveVideoIdSpanish)
					when "chile" then videoPlayer.loadVideoByID(targetVideo.fields.brightcoveVideoIdSpanish)

					when "poland" then videoPlayer.loadVideoByID(targetVideo.fields.brightcoveVideoIdPolish)

					else
						modVP.loadVideoByID(targetVideo.fields.brightcoveVideoId)


	onMediaProgressFired = (evt) ->
		videoPosition = evt.position


	onMediaEventFired = (evt) ->
		if evt.type == 'mediaBegin'
			videoPlaying = true
		else if evt.type == 'mediaStop'
			videoPlaying = false


	swapVideo = (order) ->
		modVP.getCurrentVideo(currentVideoCallback)

	
	currentVideoCallback = (currentVideo, order) ->
		if captionsOn
			switch currentCountry
				#FRENCH
				when "france" then modVP.loadVideoByID(targetVideo.fields.brightcoveVideoIdFrench)
				#JAPANESE
				when "japan" then videoPlayer.loadVideoByID(targetVideo.fields.brightcoveVideoIdJapanese)
				#TURKISH
				when "turkey" then modVP.loadVideoByID(targetVideo.fields.brightcoveVideoIdTurkish)
				#BRAZIL
				when "brazil" then modVP.loadVideoByID(targetVideo.fields.brightVideoIdBrazil)
				#ITALIAN
				when "italy" then modVP.loadVideoByID(targetVideo.fields.brightcoveVideoIdItalian)
				#SPANISH
				when "spain" then modVP.loadVideoByID(targetVideo.fields.brightcoveVideoIdSpanish)
				when "mexico" then modVP.loadVideoByID(targetVideo.fields.brightcoveVideoIdSpanish)
				when "argentina" then modVP.loadVideoByID(targetVideo.fields.brightcoveVideoIdSpanish)
				when "colombia" then modVP.loadVideoByID(targetVideo.fields.brightcoveVideoIdSpanish)
				when "chile" then modVP.loadVideoByID(targetVideo.fields.brightcoveVideoIdSpanish)

				else
					modVP.loadVideoByID(targetVideo.fields.brightcoveVideoId)

		else
			videoPlayer.loadVideoByID(targetVideo.fields.brightcoveVideoId)

		
		#CHANGE TITLE
		$('.videos h1').empty().text(targetVideo.fields.episodeTitle)


	
	resizePlayer = (video) ->
		vid = video
		ogWidth = vid.attr "width"
		ogHeight = vid.attr "height"
		winWidth = $(window).width()
		ratio = ogWidth / ogHeight
		
		#target brightcove iframe on mobile
		if isMobile
			#if iframe is present, then use regex to remove width and height
			#from src attribute
			if vid.attr "src"
				src = vid.attr "src"
				regex = /width=([\d\.]*).*height=([\d\.]*)/
				newSrc = src.replace(regex, '')
				vid.attr("src", newSrc)
				return

		else
			vidWidth = winWidth / 1.6
			vid.attr("width", vidWidth)
			vid.attr("height", vidWidth / ratio)

			diff = winWidth - vidWidth
			margin = diff / 2


			vid.css
				marginLeft: margin
				marginRight: margin
				opacity: 1


	
	setupYouTube = ->
		tag = document.createElement('script')
		tag.src = "https://www.youtube.com/iframe_api"
		firstScriptTag = document.getElementsByTagName('script')[0]
		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)

	
	window.onYouTubeIframeAPIReady = ->
		player2 = new YT.Player 'storyplayer',
			height: '39'
			width: '64'
			videoId: '-Ct_vEPmmq4'
			events: {
				"onReady": onPlayerReady2
			}
			playerVars: {
				modestbranding: true
				controls: 1
				showinfo: 0
				hd: 1
				origin: "http://www.redbullmusicacademy.com"
			}


	onPlayerReady2 = (event) ->
		resizeVid('#storyplayer')
	
	

	setupBinds = ->	
		#resize
		window.addEventListener 'resize', ->
			resizeVid($('#myExperience'))
			resizeVid($('#storyplayer'))

		$('a.arrow-right').click (event) ->
			event.preventDefault()
			composers = $('.composers-wrap')
			totalComposers = composers.find('.slide').length
			currentSlide = composers.find('.active')
			currentPos = currentSlide.data('order')

			#zero index
			if currentPos <= totalComposers - 2
				nextSlide = composers.find("[data-order=#{currentPos + 1}]")
				currentSlide.removeClass 'active'
				nextSlide.addClass 'active'
			else
				nextSlide = composers.find("[data-order=0]")
				currentSlide.removeClass 'active'
				nextSlide.addClass 'active'

		$('a.arrow-left').click (event) ->
			event.preventDefault()
			composers = $('.composers-wrap')
			totalComposers = composers.find('.slide').length
			currentSlide = composers.find('.active')
			currentPos = currentSlide.data('order')

			if currentPos >= 1
				nextSlide = composers.find("[data-order=#{currentPos - 1}]")
				currentSlide.removeClass 'active'
				nextSlide.addClass 'active'

			else
				nextSlide = composers.find("[data-order=#{totalComposers - 1}]")
				currentSlide.removeClass 'active'
				nextSlide.addClass 'active'

	
		
		#ONLY ALLOW VIDEO SWAPS IF VIDEO IS RELEASED
		# $('a.episode').click (event) ->
		# 	if $(this).children('li').hasClass "unreleased"
		# 		return
		# 	else
		# 		swapVideo()



	changeVideo = (element, order, videoObject) ->

		video = videoObject[order].fields

		#account for zero index
		if element.find('li').hasClass "unreleased"
			$('.videos h1').empty().text video.episodeTitle
			return
		else
			player1.cueVideoById(video.ytVideoId)
			$('.videos h1').empty().text video.episodeTitle


	changeAdditionalVideo = (order, additionalVideoObject) ->
		#account for zero index
		video = additionalVideoObject[order].fields
		player2.cueVideoById(video.additionalYouTube)
		$('.stories h1').empty().text video.additionalVideoTitle
		if currentCountry == "japan"
			$('.stories p.body').empty().text video.japaneseDescription
		else
			$('.stories p.body').empty().text video.description
		$('.stories p.body').slideDown()




	addVideoTitles = (object, target, type) ->
		if type == 'main'
			for video, i in object
				episode = video.fields.episodeNumber
				currentDate = new Date()

				#USE EARLIER RELEASE FOR JAPAN
				if currentCountry == "japan"
					episodeDate = new Date(video.fields.datetimeOfLaunchJapan)
				else
					episodeDate = new Date(video.fields.datetimeOfLaunch)
					


				if moment() < episodeDate
					target.append("<a class='episode' href data-order=#{i}><li class='unreleased' data-release='#{episodeDate}'>#{episode}</li>")

				else
					target.append("<a class='episode' href data-order=#{i}><li class='released'>#{episode}</li>")

				#loop through and change text of unreleased vids
				target.find('li').each ->
					t = $(this)
					if t.hasClass('unreleased')
						
						ogText = t.text()
						releaseDate = t.data('release')
						d = new Date(releaseDate)

						t.bind 'mouseenter', ->
							t.empty().text(moment(releaseDate).format('ddd, MMM Do'))
						t.bind 'mouseleave', ->
							

		
		else if type == 'additional'
			for video, i in object
				episode = video.fields.additionalVideoTitle
				target.append("<a class='additional-episode' href data-order=#{i}><li>#{episode}</li>")


	

	addComposers = (object) ->
		for composer, i in object
			person = composer.fields
			name = person.composerName
			img = person.image.fields.file.url
			if currentCountry == "japan"
				if person.japaneseBio
					textBody = converter.makeHtml(person.japaneseBio)
				else
					textBody = converter.makeHtml(person.bio)
			else
				textBody = converter.makeHtml(person.bio)

			composerData = "<div class='slide' data-order='#{i}'><div class='img-wrap'><a class='arrow-left' href></a><a class='arrow-right' href></a><img src='#{img}'/></div><h2>#{person.composerName}</h2><p>#{textBody}</p></div>"
			$(".composers-wrap").append composerData
			$('.slide').first().addClass "active"
		


	addMixes = (object) ->
		for mix in object
			mixInfo = mix.fields
			name = mixInfo.artistName
			img = mixInfo.artistImage.fields.file.url
			
			#If description exists
			if mixInfo.descriptions
				description = mixInfo.descriptions
			else
				description = ""

			#if radio show exists
			if mixInfo.rbmaRadioEmbedCode
				embed = mixInfo.rbmaRadioEmbedCode
			else

				embed = ''
			
			
			mixData = "<div class='show'><img src='#{img}'/>#{embed}<p>#{description}</p></div>"
			$('.radio').append(mixData)


	resizeVid = (vidPlayer) ->
		player = $(vidPlayer)
		winWidth = $(window).width()
		vidWidth = winWidth / 1.6
		ogWidth = player.attr('width') #extra box shadow pix
		ogHeight = player.attr('height')
		ratio = ogWidth / ogHeight

		if isMobile
			vidWidth = winWidth / 1.4

		player.attr('width', vidWidth)
		player.attr('height', vidWidth / ratio)

		diff = winWidth - vidWidth
		margin = diff / 2
		player.css
			marginLeft: margin
			display: 'block'

		#call resize AFTER video has sized
		sendHeight(getHeight())



	removeSpinner = ->
		$('.spinner').fadeOut ->
			$('.spinner').remove()

	detectMobile = ->
		if ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) )
			isMobile = true


	addShareText = (shareText) ->
		twitter = $('.twitter-share')
		fb = $('.facebook-share')
		currentCountry = currentCountry.toLowerCase()
		if currentCountry == "japan"
			twitterText = shareText.twitterShareTextJapan
			facebbookText = shareText.facebookShareTextJapan
		else
			twitterText = shareText.twitterShareText
			facebookText = shareText.facebookShareText

		twitter.attr("href", "http://twitter.com/intent/tweet?text=#{twitterText}")
		fb.attr("href", "https://www.facebook.com/sharer/sharer.php?u=http://www.redbullmusicacademy.com/magazine/diggin-in-the-carts&amp;t=#{facebookText}")


	getData = ->
		client = contentful.createClient
			accessToken: '38b8dbaf503a350d5722578c6547caca484511f7c78717736ac8f576832be4b0'
			space: 's9bc5ah7p1d5'

		#COMPOSERS
		client.entries({'content_type': '42CpXYSUms44OskS6wUU6I', 'include': 1, 'order': 'sys.updatedAt'}).done (data) ->
			addComposers(data)
			prepInit(1)
		
		#MAIN YT VIDS
		client.entries({'content_type':'36SuQSSPR6QmWOk8CseMC6', 'include': 1, 'order': 'fields.order'}).done (data) ->
			videoObject = data
			prepInit(1)
			
			addVideoTitles(videoObject, $('.video-nav ul'), 'main')

			# addPlayer()
				
			$('a.episode').bind 'click', (event) ->
				event.preventDefault()
				$(this).parent().find('li').removeClass "active"
				$(this).find('li').addClass "active"
				order = $(this).data 'order'
				targetVideo = videoObject[order]

				#add matching order to captions link, so it knows what video we are on
				$('#caption-toggle').data('order', order)

				if $(this).children('li').hasClass "unreleased"
					$('#caption-toggle').addClass "unreleased"
					return
				else
					$('#caption-toggle').removeClass "unreleased"
					swapVideo()



		#RADIO
		client.entries({'content_type':'2YpXtnGW80EEGgCUsSMmCc', 'include': 1, 'order':'fields.order'}).done (data) ->
			prepInit(1)
			addMixes(data)

		#ADDITIONAL YOUTUBE VIDS
		client.entries({'content_type':'6fwxAcXrxK4yqyaMUiWwWY', 'include': 1, 'order': 'fields.order'}).done (data) ->
			prepInit(1)
			additionalVideoObject = data
			addVideoTitles(additionalVideoObject, $('.story-nav ul'), 'additional')

			$('a.additional-episode').bind 'click', (event) ->
				event.preventDefault()
				$(this).parent().find('li').removeClass "active"
				$(this).find('li').addClass "active"
				order = $(this).data 'order'
				changeAdditionalVideo(order, additionalVideoObject)

			setupYouTube()

		#ENDING TEXT
		client.entries({'content_type':'3JB3iYStpCGYGuu24mEcQK', 'include':1}).done (data) ->
			prepInit(1)
			if currentCountry == "japan"
				$('footer p').empty().text(data[0].fields.bodyJapanese)
			else
				$('footer p').empty().text(data[0].fields.body)

		#SOCIAL SHARE
		client.entries({'content_type':'5KnZeYIgc8oUo2cgssKAWK', 'include':1}).done (data) ->
			shareText = data[0].fields
			prepInit(1)
			addShareText(shareText)


	#launch when ready
	findLocation()
	detectMobile()
	

	#DROP DOWN MENUS
	$('.pulldown').click (event) ->
		event.stopPropagation()
		event.preventDefault()
		$(this).parent().find('ul').slideToggle(400, "linear", ->
			sendHeight(getHeight())
			)

	