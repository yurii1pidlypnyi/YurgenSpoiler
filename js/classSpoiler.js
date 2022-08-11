class YurgenSpoiler {
  constructor(spoiler){
    this.spoiler = spoiler;
    this.options = {};

    this.fillOptions();

    if(this.options.type === 'simple'){
      this.initSpoiler()
    }
    if(this.options.type === 'media'){
      this.createMediaQuery()
    }
  }

  fillOptions(){
    let dataList = this.spoiler.dataset;

    for(let attr in dataList){
      switch (attr) {
        case 'spollers' :
          if(dataList[attr]){
            this.options.type = 'media'
            this.mediaQuery = dataList[attr];
          }else {
            this.options.type = 'simple'
          }
        break
        case 'accordion' : 
          this.options.accordion = true;
          this.options.openedSpoiler = [];
          break
        case 'missClick' :
          this.options.missClick = true;
          break
        
      }
    }
  }

  initSpoiler(){
      this.initSpollerBody()
      this.spoiler.classList.add('is-init')
  }

  initSpollerBody(){
    let btnsSpoiler = this.spoiler.querySelectorAll('[data-spoller]');
    btnsSpoiler.forEach(item => {
      item.nextElementSibling.hidden = true;
      item.addEventListener('click', this.clickBtnSpoiler)
    })
  }

  clickBtnSpoiler(){
    this.classList.toggle('active');
    slideToggle(this.nextElementSibling)
  }

  cancelInitSpoiler(){
    let btnsSpoiler = this.spoiler.querySelectorAll('[data-spoller]');
    btnsSpoiler.forEach(item => {
      item.nextElementSibling.removeAttribute('hidden');
      item.classList.remove('active')
      item.removeEventListener('click', this.clickBtnSpoiler);
    })
    this.spoiler.classList.remove('is-init')
  }

  createMediaQuery(){
    let paramsArray = this.mediaQuery.split(',');
    let mediaWidth = parseInt(paramsArray[0].trim());
    let mediaType = paramsArray[1] ? paramsArray[1].trim() : "max";

    this.mediaQuery = window.matchMedia(`(${mediaType}-width: ${mediaWidth}px)`);
    
    this.checkMediaQuery()

    this.mediaQuery.addEventListener('change',() => {
      this.checkMediaQuery()
    })
  }
  checkMediaQuery(){
    if(this.mediaQuery.matches){
      this.initSpoiler()
    }

    if(!this.mediaQuery.matches && this.spoiler.classList.contains('is-init')){
      this.cancelInitSpoiler()
    }
  }
}

let spoiler = document.querySelectorAll('[data-spollers]');
spoiler.forEach(item => {
  new YurgenSpoiler(item)
})