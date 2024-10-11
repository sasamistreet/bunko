<script lang="ts">
    import { onMount, onDestroy, getContext } from 'svelte';
    //import { current } from '$lib/stores';


    //export let step = 1;
    const { step, isCurrent } = $props();
    //const work = getContext('info').work;
    //const totalstep = getContext('info').totalstep;
    const stepData = {};
    const rootUrl = {}; 
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

    let left = 50;
	let top = 50

	let moving = false;
	function onMouseDown() {
        moving = true;
        console.log(moving);
	}

    function onMouseMove(e) {
        if (moving) {
            left += e.movementX;
			top += e.movementY;
        }
	}
    
    function onMouseUp() {
        moving = false;
        console.log(moving);
	}
    
</script>
<svelte:window on:mousemove={onMouseMove}  on:mouseup={onMouseUp}/>
    <div class="viewBox">
        <img bind:this={item} role="presentation" on:mousedown={onMouseDown} style:left={left}px style:top={top}px src="{rootUrl.publicUrl}" height="{width}" width="{width}" class="media" alt=""/>
        <!--<object on:mousedown={onMouseDown} style="left: {left}px; top: {top}px;"  role="figure" aria-label="" title="" type="image/svg+xml" data="{rootUrl.publicUrl}" class="media" height="{width}" width="{width}"></object>-->
    </div>
    {#if isCurrent}
    <div class="steptools uk-flex uk-flex-between uk-width-1-1 uk-padding-small">
        <div class="uk-align-left">
            <button on:click={expand}><span data-uk-icon="expand"></span></button>
            <button on:click={shrink}><span data-uk-icon="shrink"></span></button>
            <button on:click={reset}><span data-uk-icon="refresh"></span></button>
        </div>
        <div class="uk-align-right">
            <span data-uk-icon="image"></span>
            <span data-uk-icon="play-circle"></span>
        </div>
    </div>
    <div class="stepinfo">
        <div class="number">
            <span class="current-number uk-width-1-6">{$current}</span>/{totalstep}
        </div>
        <p class="description uk-width-expand">
            this is description.
        </p>
        <div class="buttons uk-width-1-6">
            <span class="uk-margin-small-right" data-uk-icon="comments"></span>6
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