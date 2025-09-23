export default function getCustomField({formId, customFieldId}){
    return(
        ` 
<div class="mb-3 flex flex-wrap lg:flex-nowrap w-full gap-3" name="customField" data-custom-field-id="${customFieldId}" data-customfield-formid="${formId}">
  <div class="w-full w-1/3 md:w-full min-w-[100px]">
    <input 
      type="text" 
      name="customFieldApi" 
      placeholder="название поля в API"
      class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
    >
  </div>
  <div class="w-full w-2/3 md:w-full min-w-[150px]">
    <input 
      type="text" 
      name="customFieldValue" 
      placeholder="значение"
      class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
    >
  </div>
</div>
        `
    )
}