function slideOpen(target, duration = 500){
  if(target.classList.contains('is-closing')){
    target.classList.remove('is-closing');
    target.style.height = `${target.offsetHeight}px`;
    target.style.removeProperty('transition-duration');
    target.style.removeProperty('transition-property');
    slideOpen(target, duration)
  } else {
    target.classList.add('is-opening')
    target.hidden = false;
    let height = 0;
    target.style.overflow = 'hidden';
    if(!!target.style.height){
      let currHeight = target.style.height;
      target.style.removeProperty('height');
      let allHeight = target.offsetHeight;
      target.style.height = currHeight;
      height = allHeight;
    }else{
      height = target.offsetHeight;
      target.style.height = '0px';
    }
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    target.offsetHeight;
    target.style.transitionProperty = "height, margin, padding";
    target.style.transitionDuration = duration + 'ms';
    target.style.height = height + 'px';
    target.style.removeProperty('padding-top');
    target.style.removeProperty('padding-bottom');
    target.style.removeProperty('margin-top');
    target.style.removeProperty('margin-bottom');
    setTimeout(() => {
      if(target.classList.contains('is-opening')){
        target.classList.remove('is-opening')
        target.removeAttribute('style')
      }
    }, duration)
  }
}
function slideClose(target, duration=500) {
  if(target.classList.contains('is-opening')){
    target.classList.remove('is-opening');
    target.style.height = `${target.offsetHeight}px`;
    target.style.removeProperty('transition-duration');
    target.style.removeProperty('transition-property');
    slideClose(target, duration)
  } else {
    target.classList.add('is-closing')
    target.style.transitionProperty = 'height, margin, padding';
    target.style.transitionDuration = duration + 'ms';
    target.style.height = `${target.offsetHeight}px`;
    target.offsetHeight;
    target.style.overflow = 'hidden';
    target.style.height = '0px';
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    setTimeout(() => {
      if(target.classList.contains('is-closing')){
        target.hidden = true;
        target.removeAttribute('style')
        target.classList.remove('is-closing')
      }
    }, duration)
  }
}
function slideToggle(target,duration = 500){
  if(target.hidden || target.classList.contains('is-closing')){
    return slideOpen(target, duration);
  } else {
    return slideClose(target, duration);
  }
}