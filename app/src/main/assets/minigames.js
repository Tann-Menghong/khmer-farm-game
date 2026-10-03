/* Small, offline village activities. Rules are separate from saving and UI. */
(() => {
  'use strict';
  const pick = n => Math.floor(Math.random() * n);
  function shuffle(values) {
    const result = values.slice();
    for(let i=result.length-1;i>0;i--) {
      const j=pick(i+1);
      [result[i],result[j]]=[result[j],result[i]];
    }
    return result;
  }
  function marketRound(session) {
    session.target=3+pick(5);
    session.options=shuffle([session.target-1,session.target,session.target+1]);
    session.produce=['rice','lotus','banana','corn','mango'][pick(5)];
  }
  function fishRound(session) {
    session.board=shuffle(['fish','lotus','rice_shoots']);
  }
  function cargoRound(session) {
    session.target=5+pick(4);
    session.load=0;
  }
  function recipeRound(session) {
    const recipes=[
      {dish:'porridge',shown:['rice'],missing:'fish',options:['fish','egg','banana']},
      {dish:'amok',shown:['fish','coconut'],missing:'lemongrass',options:['lemongrass','lotus','mango']},
      {dish:'fruit_plate',shown:['banana','mango'],missing:'watermelon',options:['watermelon','rice','coconut']}
    ];
    session.recipe=recipes[pick(recipes.length)];
    session.options=shuffle(session.recipe.options);
  }
  function create(id) {
    const session={id,round:0,mistakes:0,moves:0,finished:false};
    if(id==='rice') {
      session.board=shuffle(['ripe','ripe','ripe','young','young','young']);
      session.picked=[];
    } else if(id==='loom') {
      session.sequence=Array.from({length:4},()=>pick(3));
    } else if(id==='market') {
      marketRound(session);
    } else if(id==='lotus') {
      session.cards=shuffle(['lotus','lotus','fish','fish','mango','mango']);
      session.open=[];
      session.matched=[];
    } else if(id==='canal') {
      session.target=[0,1,2,1];
      session.gates=session.target.map(direction=>(direction+1+pick(2))%3);
      session.par=session.gates.reduce((sum,direction,i)=>sum+(session.target[i]-direction+3)%3,0);
    } else if(id==='fish') {
      fishRound(session);
    } else if(id==='cargo') {
      cargoRound(session);
    } else if(id==='recipe') {
      recipeRound(session);
    } else return null;
    return session;
  }
  function choose(session,value) {
    if(!session||session.finished)return {correct:false,finished:false};
    let correct=false;
    if(session.id==='rice') {
      const index=Number(value);
      if(!Number.isInteger(index)||index<0||index>=session.board.length||session.picked.includes(index))return {correct:false,finished:false};
      correct=session.board[index]==='ripe';
      if(correct) {
        session.picked.push(index);
        if(session.picked.length===3) {
          session.round++;
          if(session.round<3) {
            session.board=shuffle(['ripe','ripe','ripe','young','young','young']);
            session.picked=[];
          }
        }
      }
    } else if(session.id==='loom') {
      const index=Number(value);
      if(!Number.isInteger(index)||index<0||index>2)return {correct:false,finished:false};
      correct=index===session.sequence[session.round];
      if(correct)session.round++;
    } else if(session.id==='market') {
      const amount=Number(value);
      if(!Number.isInteger(amount)||!session.options.includes(amount))return {correct:false,finished:false};
      correct=amount===session.target;
      if(correct) {
        session.round++;
        if(session.round<3)marketRound(session);
      }
    } else if(session.id==='lotus') {
      const index=Number(value);
      if(!Number.isInteger(index)||index<0||index>=session.cards.length||session.matched.includes(index)||session.open.includes(index))return {correct:false,finished:false};
      if(session.open.length===2)session.open=[];
      session.open.push(index);
      if(session.open.length===2) {
        correct=session.cards[session.open[0]]===session.cards[session.open[1]];
        if(correct){session.matched.push(...session.open);session.open=[];session.round++;}
      } else correct=true;
    } else if(session.id==='canal') {
      const index=Number(value);
      if(!Number.isInteger(index)||index<0||index>=session.gates.length)return {correct:false,finished:false};
      session.moves++;
      session.gates[index]=(session.gates[index]+1)%3;
      correct=session.gates[index]===session.target[index];
      session.round=session.gates.filter((direction,i)=>direction===session.target[i]).length;
    } else if(session.id==='fish') {
      const index=Number(value);
      if(!Number.isInteger(index)||index<0||index>=session.board.length)return {correct:false,finished:false};
      correct=session.board[index]==='fish';
      if(correct){session.round++;if(session.round<3)fishRound(session);}
    } else if(session.id==='cargo') {
      const amount=Number(value);
      if(!Number.isInteger(amount)||amount<1||amount>3)return {correct:false,finished:false};
      correct=session.load+amount<=session.target;
      session.load=correct?session.load+amount:0;
      if(session.load===session.target){session.round++;if(session.round<3)cargoRound(session);}
    } else if(session.id==='recipe') {
      if(!session.options.includes(value))return {correct:false,finished:false};
      correct=value===session.recipe.missing;
      if(correct){session.round++;if(session.round<3)recipeRound(session);}
    }
    if(!correct && session.id!=='canal' && !(session.id==='lotus'&&session.open.length===1))session.mistakes++;
    session.finished=session.round===(session.id==='loom'||session.id==='canal'?4:3);
    return {correct,finished:session.finished};
  }
  function stars(session) {
    if(!session||!session.finished)return 0;
    if(session.id==='canal')return session.moves===session.par?3:session.moves<=session.par+2?2:1;
    return session.mistakes===0?3:session.mistakes<=2?2:1;
  }
  window.SrokMini={create,choose,stars};
})();
