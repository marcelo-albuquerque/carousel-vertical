class CarouselPlugin {
  constructor( args ) {
    const wrapperContainers = document.querySelectorAll( '.carousel-wrapper' )

    this.Events( wrapperContainers, args )
  }

  Events( WrapperContainers, Args ) {
    const AddStylesToAllCards = ( Cards, Gap ) => {
      Cards.forEach(Card => {
        Card.style.marginBottom = `${ Gap }rem`
      })
    }

    const AddStylesToCarouselContainer = ( CarouselContainer, CarouselContainerHeight, Gap ) => {
      CarouselContainer.style.padding = `${ Gap }rem`
      CarouselContainer.style.height = `${ CarouselContainerHeight }rem`
    }

    const AddStylesToFirstCard = ( FirstCard, MarginBaseValue ) => {
      FirstCard.classList.add( 'active' )
      FirstCard.style.marginTop = `${ MarginBaseValue }rem`
    }

    const AddEventListenerToAllCards = ( Cards, FirstCard, MarginBaseValue ) => {
      function RemoveClassActiveFromAllCards( Cards ) {
        Cards.forEach( Card => Card.classList.remove( 'active' ) )
      }

      function NavigateEvents( Event, MarginBaseValue, FirstCard ) {
        const card = Event.currentTarget
        const cardIndex = parseInt( card.getAttribute( 'data-index' ) )

        card.classList.add( 'active' )

        if ( cardIndex === 0 ) {
          FirstCard.style.marginTop = `${ MarginBaseValue }rem`
        } else {
          const margin = ( MarginBaseValue * cardIndex ) - MarginBaseValue

          FirstCard.style.marginTop = `-${ margin }rem`
        }        
      }

      Cards.forEach(Card => {
        Card.addEventListener('click', () => {
          RemoveClassActiveFromAllCards( Cards )
        })

        Card.addEventListener('click', ( event ) => {
          NavigateEvents( event, MarginBaseValue, FirstCard )
        })
      })
    }

    WrapperContainers.forEach(WrapperContainer => {
      const carouselContainer = WrapperContainer.querySelector( '.carousel-container' )

      const cards = carouselContainer.querySelectorAll( '.card' )
      const firstCard = cards[0]
      const cardHeight = cards[1].getBoundingClientRect().height / 16
      
      const marginBaseValue = cardHeight + Args.gap
      const carouselContainerHeight = ( cardHeight * 3 ) + ( Args.gap * 4 )

      AddStylesToCarouselContainer( carouselContainer, carouselContainerHeight, Args.gap )
      AddStylesToAllCards( cards, Args.gap )
      AddStylesToFirstCard( firstCard, marginBaseValue )
      AddEventListenerToAllCards( cards, firstCard, marginBaseValue )
    });
  }
}