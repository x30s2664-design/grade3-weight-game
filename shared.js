
const GameCore = (() => {
  const KEY = 'grade3WeightProgressV2';

  function loadProgress(){
    try{
      const p = JSON.parse(localStorage.getItem(KEY) || '{}');
      return {
        gramsWins: Number.isFinite(p.gramsWins) ? p.gramsWins : 0,
        kilogramsWins: Number.isFinite(p.kilogramsWins) ? p.kilogramsWins : 0,
        tonsWins: Number.isFinite(p.tonsWins) ? p.tonsWins : 0
      };
    }catch{
      return {gramsWins:0,kilogramsWins:0,tonsWins:0};
    }
  }

  function saveProgress(p){ localStorage.setItem(KEY, JSON.stringify(p)); }

  function addWin(game){
    const p = loadProgress();
    const key = game + 'Wins';
    p[key] = Math.min(3, (p[key] || 0) + 1);
    saveProgress(p);
    return p[key];
  }

  function isUnlocked(game){
    const p = loadProgress();
    if(game === 'grams') return true;
    if(game === 'kilograms') return p.gramsWins >= 3;
    if(game === 'tons') return p.gramsWins >= 3 && p.kilogramsWins >= 3;
    return false;
  }

  function dragSpeedFromGrams(weightGrams){
    return 1000 * Math.pow(weightGrams / 100, -0.5);
  }

  function liftTimeFromGrams(weightGrams){
    const ms = 350 + 220 * Math.log2(Math.max(1, weightGrams / 100));
    return Math.max(350, Math.min(2600, ms));
  }

  function autoScrollForPointer(clientY){
    const edge = Math.min(120, window.innerHeight * .2);
    const maxScroll = 22;
    if(clientY < edge && window.scrollY > 0){
      const s = Math.min(1,(edge-clientY)/edge);
      window.scrollBy(0,-Math.max(5,maxScroll*s));
    }else if(clientY > window.innerHeight-edge){
      const s = Math.min(1,(clientY-(window.innerHeight-edge))/edge);
      window.scrollBy(0,Math.max(5,maxScroll*s));
    }
  }

  function moveLimited(pic,state,speed,dt){
    const dx=state.targetX-state.currentX, dy=state.targetY-state.currentY;
    const distance=Math.hypot(dx,dy);
    if(distance>.3){
      const step=Math.min(distance,speed*dt);
      state.currentX += dx/distance*step;
      state.currentY += dy/distance*step;
    }
    pic.style.transform=`translate(${state.currentX}px,${state.currentY}px) scale(1.08)`;
  }

  function resetAll(){
    saveProgress({gramsWins:0,kilogramsWins:0,tonsWins:0});
  }

  return {loadProgress,saveProgress,addWin,isUnlocked,dragSpeedFromGrams,liftTimeFromGrams,autoScrollForPointer,moveLimited,resetAll};
})();
