/**
This Overlay component provides a full-screen cover element.
It is mounted to a separate V/DOM tree appended to the body.
Children supplied to Overlay are rendered into this tree.
The Overlay component can be nested anywhere within your app's
view but will be rendered to display overtop everything else.
*/

const Overlay = function() {
	let dom
	let children

	const OverlayContainer = {
		view: () => children
	}

	return {
		oncreate(v) {
			children = v.children
			// Append a container to the end of body
			dom = document.createElement('div')
			dom.className = 'overlay'
			document.body.appendChild(dom)
			m.mount(dom, OverlayContainer)
		},
		onbeforeupdate(v) {
			children = v.children
		},
		onbeforeremove(v) {
			// Add a class with fade-out exit animation
			dom.classList.add('hide')
			return new Promise(r => {
				dom.addEventListener('animationend', r)
			})
		},
		onremove() {
			m.mount(dom, null)
			// Destroy the overlay dom tree. Using m.mount with
			// null triggers any modal children removal hooks.
			document.body.removeChild(dom)
		},
		view() {}
	}
}

/**
This Modal component uses the Overlay component to provide a
full screen cover and renders a dialog-like widget within that
waits for the user to click a button. A Modal instance can
be nested anywhere within your app's view and will be rendered
on top of everything else.

Expected attrs are as follows:

interface Attrs {
  title: m.Children
  content: m.Children
  buttons: {id: string, text: string}[]
  onClose(id: string): void
}

At least one button should be provided otherwise there
will be no way to close the modal.
*/

const Modal = function(v) {
    let clickedId
    
    return {
      view(v) {
        // {attrs: {title, content, buttons, onClose}}
        if (clickedId != null) {
          // We need to allow the Overlay component execute its
          // exit animation. Because it is a child of this component,
          // it will not fire when this component is removed.
          // Instead, we need to remove it first before this component
          // goes away.
                  // When a button is clicked, we omit the Overlay component
          // from this Modal component's next view render, which will
          // trigger Overlay's onbeforeremove hook.
          return null
        }
        return m(Overlay,
          {
            onremove() {
              // Wait for the overlay's removal animation to complete.
              // Then we fire our parent's callback, which will
              // presumably remove this Modal component.
              Promise.resolve().then(() => {
                v.attrs.onClose(clickedId)
                m.redraw()
              })
            }
          },
          m('.modals',
            m('h3', v.attrs.title),
            m('.modal-content', m(v.attrs.content)),
            m('.modal-buttons',
              v.attrs.buttons.map(b =>
                m('button',
                  {
                    type: 'button',
                    // disabled: clickedId != null,
                    onclick: ()=>{
                      b.click();
                    }
                  },
                  b.text
                )
              )
            )
          )
        )      
      }
    }
  }
  