$ ->
	init = ->
		setupBinds()

	setupBinds = ->
		$('nav').bind 'mouseenter', ->
			$(@).transition
				left: 0
			, 200
		$('nav').bind 'mouseleave', ->
			$(@).transition
				left: '-100px'
			, 200


	init()


	
		
	