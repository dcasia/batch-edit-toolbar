<template>

    <div class="flex ml-1 rounded-lg dark:focus:ring-gray-600 bg-gray-100 dark:bg-gray-700">

        <ConfirmActionModal
            v-if="actionModalVisible"
            :resourceName="resourceName"
            :show="actionModalVisible"
            :working="working"
            :selected-resources="selectedResources"
            :errors="errors"
            @confirm="executeAction"
            @close="closeConfirmationModal"
            :action="selectedAction"/>

        <div v-for="field of actions">

            <button
                v-tooltip="field.batchEditable.tooltip || field.batchEditable.title || __(`Update :name`, { name: field.name })"
                @click.stop="() => openModal(field)"
                type="button"
                class="hover:text-primary-500 inline-flex items-center justify-center w-9 h-9 focus:outline-none focus:ring ring-primary-200 dark:ring-gray-600 rounded-lg">

                <template v-if="field.batchEditable.icon.startsWith('<svg')">
                    <div v-html="field.batchEditable.icon"/>
                </template>

                <Icon v-else :type="field.batchEditable.icon"/>

            </button>

        </div>

    </div>

</template>

<script>

    import { computed, reactive, ref } from 'vue'
    import { useLocalization } from '@/composables/useLocalization'
    import { useActions } from '@/composables/useActions'

    export default {
        props: [ 'toolbar' ],
        emits: [ 'actionExecuted' ],
        setup(props) {

            const { __ } = useLocalization()
            const activeField = ref(null)
            const options = computed(()=> activeField.value.batchEditable || {})
            const selectedResources = computed(() => props.toolbar._.props.selectedResourcesForActionSelector)
            const resourceName = props.toolbar._.props.resourceName

            const randomKey = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)

            const selectedAction = reactive({
                confirmText: computed(() => options.value.confirmText),
                cancelButtonText: computed(() => options.value.cancelButtonText || __('Cancel')),
                confirmButtonText: computed(() => options.value.confirmButtonText || __('Update')),
                name: computed(() => options.value.title || __(`Update :name`, { name: activeField.value.name })),
                fields: computed(() => [
                    activeField.value,
                    { fill: formData => formData.append('__attribute_name__', activeField.value.attribute) },
                ]),
                modalSize: computed(() => options.value.modalSize || '2xl'),
                modalStyle: computed(() => options.value.modalStyle || 'window'),
                uriKey: randomKey,
                destructive: false,
            })

            const emitter = event => {

                if (event === 'actionExecuted') {
                    Nova.$on('actionExecuted')
                    props.toolbar.getResources()
                }

            }

            const {
                actionModalVisible,
                working,
                errors,
                executeAction,
                closeConfirmationModal,
                openConfirmationModal,
                setSelectedActionKey,
            } = useActions({
                endpoint: `/nova-vendor/batch-edit-toolbar/${ resourceName }/update`,
                resourceName: resourceName,
                actions: [ selectedAction ],
                get selectedResources() {
                    return selectedResources.value
                },
            }, emitter, Nova.store)

            setSelectedActionKey(randomKey)

            const actions = computed(() => {

                const resources = props.toolbar._.props.selectedResources

                if (resources.length && resources[ 0 ].fields.length) {

                    const fields = resources[ 0 ].fields.filter(field => typeof field.batchEditable !== 'undefined')

                    if (resources.length > 1) {
                        return fields.map(field => ({ ...field, value: null }))
                    }

                    return fields

                }

                return []

            })

            return {
                actionModalVisible,
                working,
                errors,
                executeAction,
                closeConfirmationModal,
                actions,
                selectedAction,
                selectedResources,
                activeField,
                resourceName,
                openModal(field) {
                    activeField.value = field
                    openConfirmationModal()
                },
            }

        },
    }

</script>
