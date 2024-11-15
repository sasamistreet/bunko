
<script lang="ts">
    import { onMount, onDestroy, getContext, tick } from 'svelte';
    import { page } from '$app/stores';
    import { fade } from 'svelte/transition';
    import { Maximize2, Minimize2, CircleDashed, FlipHorizontal2, RotateCw, RotateCcw, MessageSquare, Image, PlaySquare, Shapes} from 'lucide-svelte'
    //import { current } from './stores'


    let { step, total, current } = $props();
    //let isCurrent = $state(false);
    let left = $state(0);
	let top = $state(0);
    
    let flipped = $state(false);
    let commentsOpen = $state(false);
    const work = $page.params.id

    const stepData = {};
    const rootUrl = {
        "publicUrl" : ""
    }; 
    let scale:number = $state(1);
    
    
    let width = $derived(100 * scale);
    let item: HTMLImageElement;
    onMount(async() => {
        /*if ( step > 0 && step <= totalstep ){
            stepData = await fetch(`/api/steps?work=${work}&step=${step}`).then( res => res.json() );
        } else {
            //ダミー
            stepData = await fetch(`/api/steps?work=1&step=1`).then( res => res.json() );
        }
        //URLを取得
        rootUrl = await fetch(`/api/storage?path=${stepData.figure_svg_path}`).then( res => res.json() );
        item.ondragstart = function() {
            //これをしないとブラウザの機能と競合してドラッグできない
            return false;
        };*/
	});

    onDestroy(() => {
        console.log("destroyed")
	});

    export function expand() {
        if (step === current){
            scale = scale + 0.5;
        }
        
    }

    function shrink () {
        if (scale > 0.5){
            scale = scale - 0.5;
        }
    }

    function reset () {
        scale = 1;
    }

    function flip(){

    }
    
    function rotateRight(){

    }

    function rotateLeft(){

    }

	let moving = $state(false);

	function onMouseDown() {
        moving = true;
	}

    function onMouseMove(e:MouseEvent) {
        if (moving) {
            left += e.movementX;
			top += e.movementY;
        }
	}
    
    function onMouseUp() {
        moving = false;
	}
    
</script>
<svelte:window onmousemove={onMouseMove}  onmouseup={onMouseUp} />
    <div class="viewBox" style:width={width}px style:height={width}px>
        <img bind:this={item} role="presentation" onmousedown={onMouseDown} style:left={left}px style:top={top}px src="{rootUrl.publicUrl}" height="{width}" width="{width}" class="media" alt=""/>
        <!--<object on:mousedown={onMouseDown} style="left: {left}px; top: {top}px;"  role="figure" aria-label="" title="" type="image/svg+xml" data="{rootUrl.publicUrl}" class="media" height="{width}" width="{width}"></object>-->
    </div>
    {#if current == step}
    <div class="steptools flex justify-between w-full p-2" in:fade={{delay:200, duration:100 }}>
        <div class="text-left">
            <button onclick={expand}><Maximize2 strokeWidth={1} /></button>
            <button onclick={shrink}><Minimize2 strokeWidth={1} /></button>
            <button onclick={reset}><CircleDashed strokeWidth={1} /></button>
        </div>
        <div class="text-center">
            <button onclick={expand}><Shapes strokeWidth={1} /></button>
            <button onclick={expand}><Image strokeWidth={1} /></button>
            <button onclick={expand}><PlaySquare strokeWidth={1} /></button>
        </div>
        <div class="text-right">
            <button onclick={expand}><RotateCcw strokeWidth={1} /></button>
            <button onclick={shrink}><RotateCw strokeWidth={1} /></button>
            <button onclick={reset}><FlipHorizontal2 strokeWidth={1} /></button>
        </div>
    </div>
    <div class="stepinfo" in:fade={{delay:200, duration:100 }}>
        <div class="number">
            <span class="current-number w-1/6">{step}</span>/{total}
        </div>
        <p class="description w-full">
            this is description.
        </p>
        <div class="buttons">
            <button onclick={reset}><MessageSquare strokeWidth={1} /></button>
        </div>
    </div>
    {/if}
    
<style>
    .viewBox{
        margin:0;
        position:relative;
        overflow:visible;
        transition:width 0.3s cubic-bezier(0.19, 1, 0.22, 1); /* easeOutExpo */
        transition:height 0.3s cubic-bezier(0.19, 1, 0.22, 1); /* easeOutExpo */
    }
    .media{
        position: absolute;
        user-select: none;
        cursor: move;
        user-select: none;
        transform-origin: center;
        transition:width 3s cubic-bezier(0.19, 1, 0.22, 1); /* easeOutExpo */
        transition:height 3s cubic-bezier(0.19, 1, 0.22, 1); /* easeOutExpo */
    }
    .steptools{
		position:absolute;
		left:0;
		top:0;
	}
    .steptools button {
        border: none;
        padding: 0;
        margin: 0;
        cursor: pointer;
        background: none;
    }
	.stepinfo{
		position:absolute;
		left:0;
		bottom:0;
		background:linear-gradient(0deg, rgba(0,0,0,0.08), rgba(0,0,0,0));
		width:100%;
		padding:5px 20px;
		min-height:40px;
		display:flex;
		flex-direction: row;
		align-items: baseline;
		gap:20px;
	}
	.number{
		font-size:0.8rem;
	}
	.current-number{
		font-size:1.6rem;
	}
	.description{
		font-size:0.8rem;
	}
	
</style>