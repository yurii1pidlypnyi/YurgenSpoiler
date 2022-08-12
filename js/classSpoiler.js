class YurgenSpoiler {
  constructor(spoiler){
    this.spoiler = spoiler;
    this.options = {};
    this.options.openedSpoiler = [];
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
            this.options.type = 'media';
            this.options.wasInited = false;
            this.mediaQuery = dataList[attr];
          }else {
            this.options.type = 'simple'
          }
        break
        case 'accordion' : 
          this.options.accordion = true;
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
      if(!this.options.wasInited){
        item.addEventListener('click', () => {
          if(!this.spoiler.classList.contains('is-init')){
            return 0
          }
          if(item.classList.contains('active')){
            this.closeSpoiler([item])
          } else {
            this.openSpoiler(item)
          }
        })
      }
    })
  }

  cancelInitSpoiler(){
    let btnsSpoiler = this.spoiler.querySelectorAll('[data-spoller]');
    btnsSpoiler.forEach(item => {
      item.nextElementSibling.removeAttribute('hidden');
      item.classList.remove('active')
    })
    this.options.openedSpoiler = [];
    this.options.wasInited = true;
    this.spoiler.classList.remove('is-init');
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

  openSpoiler(spoiler){
    if(this.options.accordion){
      if(this.options.openedSpoiler.length){
        this.closeSpoiler(this.options.openedSpoiler)
      }
    }
    spoiler.classList.add('active');
    slideOpen(spoiler.nextElementSibling);
    this.options.openedSpoiler.push(spoiler)
  }

  closeSpoiler(array){
    array.forEach(item => {
      item.classList.remove('active');
      slideClose(item.nextElementSibling);
      this.options.openedSpoiler.splice(this.options.openedSpoiler.indexOf(item),1)
    })
  }
}

let spoiler = document.querySelectorAll('[data-spollers]');
spoiler.forEach(item => {
  new YurgenSpoiler(item)
})