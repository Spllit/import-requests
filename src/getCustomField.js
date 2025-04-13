export default function getCustomField({formId, customFieldId}){
    return(
        `
        <div class="mb-3 relative" name="customField" data-custom-field-id="${customFieldId}", data-customField-formId="${formId}">
            <input type="text" name="customFieldApi" placeholder="название поля в API" class=" w-50 mr-3 p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200">
            <input type="text" name="customFieldValue" placeholder="значение" class=" w-85 p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200">
        </div>
        `
    )
}