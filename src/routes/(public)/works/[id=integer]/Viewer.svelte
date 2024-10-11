<script lang="ts">
	//import { onDestroy, setContext } from 'svelte';
	import { slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { flip } from 'svelte/animate';
	//import Step from './Step.svelte';
	
    let current = $state(1);
    let steps = $derived([current-2, current-1, current, current+1, current+2])

    type Props = {
        totalSteps: number;
    };
    const  { totalSteps }:Props = $props();

	let hoverstep = $state(1);
	let left = $state(0);
	let display = $state("none");

	function forward(){
		if (current < totalSteps){
			current++;
		}
	}
	function back(){
		if (current > 1){
			current--;
		}
	}

	function showHoverStep(e: MouseEvent) {
		left = e.clientX - 12;
		display = "block";
		hoverstep = Math.ceil((e.offsetX / (e.target as HTMLInputElement).clientWidth) * parseInt((e.target as HTMLInputElement).getAttribute('max')!, 10));
	}
	function hideHoverStep(){
		display = "none";
	}

	
	
</script>
<svelte:window/>
<div class="viewer">
	<ul class="step-list">
		{#each steps as $step, i ($step)}
		<li id="{$step.toString()}" class="step" class:current="{current == $step}" animate:flip="{{ duration: 300, easing: quintOut }}" out:slide="{{ duration: 300, axis: 'x' }}" in:slide="{{ duration: 300, axis: 'x' }}" >
			
		</li>
		{/each}
	</ul>
	<button onclick={back} class="viewer-nav viewer-nav-back"><span class="uk-text-large uk-light"></span></button>
	<button onclick={forward} class="viewer-nav viewer-nav-forward"><span class="uk-text-large uk-light"></span></button>
</div>

<div class="viewer-toolbar">
    <div class="toolbar-item uk-width-1-4">
        <span class="" data-uk-icon="phone"></span>
    </div>
    <div class="toolbar-stepper uk-width-1-2">
        <div>
            <span class="uk-text-left" data-uk-icon="thumbnails"></span>
        </div>
		<div class="toolbar-tooltip" style="left: {left}px; display: {display};" >{hoverstep}</div>
        <input class="steps-slider uk-range uk-width-expand" type="range" bind:value={current} onmousemove={showHoverStep} onmouseout={hideHoverStep} onblur={hideHoverStep} min=1 max={totalSteps} aria-label="Range">
        <div style="display:inline-flex;">
            <button onclick={back} ><span ></span></button>
			<button onclick={forward} ><span ></span></button>
        </div>
    </div>
    <div class="toolbar-item uk-width-1-4 uk-text-right">
        <span data-uk-icon="phone"></span>
    </div>
</div>

<style>
	.viewer{
		position:relative;
	}
	.viewer-nav{
		opacity:0;
		position:absolute;
		top:0%;
		height:100%;
		width:12.5%;
		vertical-align: middle;
		text-align: center;
		border:none;
		transition: all .2s ease-out;
		background-color: rgba(0,0,0,0.3);
		cursor: pointer;
	}
	.viewer-nav:hover{
		opacity:1;
		transition: all .2s ease-in;
	}
	.viewer-nav-back{
		left:0;
	}
	.viewer-nav-forward{
		right:0;
	}

	.step-list{
		list-style: none;
		width:100%;
		overflow-x: hidden;
		min-height:480px;
		display:flex;
		flex-direction: row;
		flex-wrap: nowrap;
		position:relative;
		margin:0;
		justify-content: center;
		padding:0;
	}

	.step{
		display:flex;
		flex-basis:25%;
		min-width:25%;
		flex-grow:1;
		align-items: center;
		justify-content: center;
		position:relative;
		background:#fafafa;
		height:480px;
		overflow: hidden;
	}
	
	.current{
		box-sizing:border-box;
		flex-basis:50%;
		/*min-width:480px;*/
		min-width:50%;
		flex-grow:1;
		background:#ffffff;

	}
	
	/*.steptools{
		position:absolute;
		left:0;
		top:0;
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
	}*/
	
	.viewer-toolbar{
		background:#222;
		color:#ddd;
		display:flex;
		
        align-items: center;
		justify-content: center;
		position:relative;
	}

    .toolbar-stepper{
        min-width:480px;
        display:flex;
		flex-basis:480px;
		flex-grow:1;
    }
	.steps-slider{
		padding:14px 0;
	}
	.toolbar-tooltip{
		position:absolute;
		bottom:34px;
		background:rgba(0,0,0,0.5);
		color:#FFF;
		width:2rem;
		text-align:center;
		padding:2px 0px;
		border-radius: 2px;
	}
	.viewer-toolbar button{
		padding:0;
		margin:0;
		background:transparent;
		border:none;
		color:#fff;
		cursor: pointer;
	}
</style>