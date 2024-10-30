<script lang="ts">
    import { onMount, onDestroy, getContext } from 'svelte';
    import { page } from '$app/stores';
    import { Maximize2, Minimize2, Eraser } from 'lucide-svelte'
    //import { current } from './stores'

    const { step, total, current } = $props();
    //let isCurrent = $state(false);
    let left = $state(50);
	let top = $state(50);
    let scale:number = $state(1);
    const work = $page.params.id

    const stepData = {};
    const rootUrl = {
        "publicUrl" : ""
    }; 
    
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

    function expand() {
        scale = scale + 0.5;
    }

    function shrink () {
        scale = scale - 0.5;
    }

    function reset () {
        scale = 1;
    }

    

	let moving = false;
	function onMouseDown() {
        moving = true;
        console.log(moving);
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
<svelte:window onmousemove={onMouseMove}  onmouseup={onMouseUp}/>
    <div class="viewBox">
        <img bind:this={item} role="presentation" onmousedown={onMouseDown} style:left={left}px style:top={top}px src="{rootUrl.publicUrl}" height="{width}" width="{width}" class="media" alt=""/>
        <!--<object on:mousedown={onMouseDown} style="left: {left}px; top: {top}px;"  role="figure" aria-label="" title="" type="image/svg+xml" data="{rootUrl.publicUrl}" class="media" height="{width}" width="{width}"></object>-->
    </div>
    {#if step == current}
    <div class="steptools flex flex-between w-full p-2">
        <div class="text-left">
            <button onclick={expand}><Maximize2 strokeWidth={1} /></button>
            <button onclick={shrink}><Minimize2 strokeWidth={1} /></button>
            <button onclick={reset}><Eraser strokeWidth={1} /></button>
        </div>
        <div class="text-right">
            <span data-uk-icon="image"></span>
            <span data-uk-icon="play-circle"></span>
        </div>
    </div>
    <div class="stepinfo">
        <div class="number">
            <span class="current-number w-1/6">{step}</span>/{total}
        </div>
        <p class="description w-full">
            this is description.
        </p>
        <div class="buttons w-1/6">
            <span class="mr-2" data-uk-icon="comments"></span>6
        </div>
    </div>
    {/if}
    
<style>
    .viewBox{
        height: 100%;
        width: 100%;
        margin:0;
        position:relative;
    }
    .media{
        position: absolute;
        user-select: none;
        cursor: move;
        user-select: none;
        transform-origin: center;
        transition:width 0.3s cubic-bezier(0.19, 1, 0.22, 1); /* easeOutExpo */
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