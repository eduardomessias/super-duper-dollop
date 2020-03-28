let approach = document.getElementById('approach')
let category = document.getElementById('category')

approach.onchange = (e) => {
  switch (e.srcElement.value) {
    case 'analogy':
    case 'parametric':
    case 'size':
      category.value = 'formal';
      break;
    case 'mechanical':
    case 'judgmental':
      category.value = 'combination';
      break;
    case 'wbs':
    case 'group':
      category.value = 'expert';
      break;
    default:
      break;
  }
}