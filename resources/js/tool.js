import Toolbar from './components/Toolbar.vue'
import { createVNode, render } from 'vue'

Nova.booting(app => {

    app.mixin({
        mounted() {

            if (this._.type?.__file?.endsWith('ResourceTableToolbar.vue')) {

                const container = document.createElement('div')
                container.id = 'batch-edit-toolbar'

                const relationship = this.actionQueryString?.viaRelationship
                const resourceName = this.resourceName

                let target

                if (relationship) {
                    target = `[dusk="${ resourceName }-index-component"][data-relationship="${ relationship }"] div.h-9.ml-auto.flex.items-center.pr-2.md\\:pr-3`
                } else if (this.isLensView) {
                    target = `[dusk="${ resourceName }-lens-component"] div.h-9.ml-auto.flex.items-center.pr-2.md\\:pr-3`
                } else {
                    target = `[dusk="${ resourceName }-index-component"] div.h-9.ml-auto.flex.items-center.pr-2.md\\:pr-3`
                }

                const element = document.querySelector(target)

                if (element) {

                    element.insertAdjacentElement('beforebegin', container)

                    const vnode = createVNode(Toolbar, { toolbar: this })
                    vnode.appContext = app._context

                    render(vnode, container)

                }

            }

        },
    })

})
