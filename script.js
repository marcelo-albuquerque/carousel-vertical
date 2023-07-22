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

    const AddStylesToActiveCards = ( Cards, NumberOfActiveItems, MarginBaseValue ) => {
      for ( let index = 0; index < NumberOfActiveItems; index++ ) {
        Cards[index].classList.add( 'active' )
      }

      Cards[0].style.marginTop = `${ MarginBaseValue }rem`
    }

    const AddEventListeners = ( Cards, NavigationButtons, MarginBaseValue ) => {
      const GetActiveCards = ( Cards ) => {
        const activeCards = []

        Cards.forEach(Card => {
          if ( Card.classList.contains( 'active' ) ) {
            activeCards.push( Card )
          }
        })

        return activeCards
      }

      let margin = MarginBaseValue
      const firstCard = Cards[0]
            
      function NavigateCardsEvents( Event, Cards ) {
        const VerifyDirection = ( ActiveCards, Card ) => {
          const cardIndex = parseInt( Card.getAttribute( 'data-index' ) )

          let direction

          ActiveCards.forEach(ActiveCard => {
            const activeCardIndex = parseInt( ActiveCard.getAttribute( 'data-index' ) )

            if ( cardIndex > activeCardIndex ) {
              direction = 'down'
            } else {
              direction = 'up'
            }
          })

          return direction
        }

        const card = Event.currentTarget
        const firstCard = Cards[0]

        if ( !card.classList.contains( 'active' ) ) {
          const activeCards = GetActiveCards( Cards )

          card.classList.add( 'active' )

          const direction = VerifyDirection( activeCards, card )
          
          if ( direction === 'down' ) {
            activeCards[0].classList.remove( 'active' )

            margin = margin - MarginBaseValue
            firstCard.style.marginTop = `${ margin }rem`
          } else if ( direction === 'up' ) {
            activeCards[activeCards.length - 1].classList.remove( 'active' )

            margin = margin + MarginBaseValue
            firstCard.style.marginTop = `${ margin }rem`
          }
        }
      }

      Cards.forEach(Card => {
        Card.addEventListener('click', ( event ) => {
          NavigateCardsEvents( event, Cards )
        })
      })

      NavigationButtons.forEach(Button => {
        if ( Button.classList.contains( 'navigation-button-down' ) ) {
          Button.addEventListener('click', () => {
            const VerifyAfterCard = ( ActiveLastCardIndex, Cards ) => {
              const card = Cards[ActiveLastCardIndex + 1]

              if ( card !== undefined ) {
                return true
              } else {
                return false
              }
            }

            const activeCards = GetActiveCards( Cards )

            const activeLastCardIndex = parseInt( activeCards[activeCards.length - 1].getAttribute( 'data-index' ) )

            const afterCard = VerifyAfterCard( activeLastCardIndex, Cards )

            if ( afterCard === true ) {
              activeCards[0].classList.remove( 'active' )

              Cards[activeLastCardIndex + 1].classList.add( 'active' )
  
              margin = margin - MarginBaseValue
  
              firstCard.style.marginTop = `${ margin }rem`
            } else {
              //
            }            
          })
        } else if ( Button.classList.contains( 'navigation-button-up' ) ) {
          Button.addEventListener('click', () => {
            const VerifyBeforeCard = ( ActiveFirstCardIndex, Cards ) => {
              const card = Cards[ActiveFirstCardIndex - 1]

              if ( card !== undefined ) {
                return true
              } else {
                return false
              }
            }

            const activeCards = GetActiveCards( Cards )

            const activeFirstCardIndex = parseInt( activeCards[0].getAttribute( 'data-index' ) )

            const beforeCard = VerifyBeforeCard( activeFirstCardIndex, Cards )

            if ( beforeCard === true ) {
              activeCards[activeCards.length - 1].classList.remove( 'active' )

              Cards[activeFirstCardIndex - 1].classList.add( 'active' )
  
              margin = margin + MarginBaseValue
  
              firstCard.style.marginTop = `${ margin }rem`
            } else {
              // Podemos ocultar o botão por exemplo.
            }
          })
        }
      })
    }

    WrapperContainers.forEach(WrapperContainer => {
      const carouselContainer = WrapperContainer.querySelector( '.carousel-container' )

      const cards = carouselContainer.querySelectorAll( '.card' )
      const cardHeight = cards[0].getBoundingClientRect().height / 16

      const marginBaseValue = cardHeight + Args.gap
      const countSpaces = Args.numberOfActiveItems + 2
      const countGaps = Args.numberOfActiveItems + 3

      const carouselContainerHeight = ( cardHeight * countSpaces ) + ( Args.gap * countGaps )

      const navigationButtons = WrapperContainer.querySelectorAll( '.navigation-button' )

      AddStylesToCarouselContainer( carouselContainer, carouselContainerHeight, Args.gap )
      AddStylesToAllCards( cards, Args.gap )
      AddStylesToActiveCards( cards, Args.numberOfActiveItems, marginBaseValue )
      AddEventListeners( cards, navigationButtons, marginBaseValue )
    });
  }
}