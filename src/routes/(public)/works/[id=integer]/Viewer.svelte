<script lang="ts">
	//import { onDestroy, setContext } from 'svelte';
	import { slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { flip } from 'svelte/animate';
	import { ChevronLeft, ChevronRight } from 'lucide-svelte'
	import Step from './Step.svelte';
	//import { current, steps } from './stores'
	import { page } from '$app/stores';
	
    let current = $state(3);
    let steps = $derived([current-2, current-1, current, current+1, current+2])

	const work = $page.params.id

    type Props = {
        total: number;
    };
    const  { total }:Props = $props();

	let hoverstep = $state(1);
	let left = $state(0);
	let display = $state("none");

	function forward(){
		if (current < total){
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
	<ul class="step-list" transition:slide|global>
		{#each steps as step, i (step)}
		<li id="{step.toString()}" class="step" class:current="{current == step}" animate:flip="{{ duration: 3000, easing: quintOut }}" >
			<Step step={step} total={total} current={current} />
		</li>
		{/each}
	</ul>
	<button onclick={back} class="viewer-nav viewer-nav-back"><ChevronLeft /></button>
	<button onclick={forward} class="viewer-nav viewer-nav-forward"><ChevronRight /></button>
</div>

<div class="viewer-toolbar">
    <div class="toolbar-item w-1/4">
        <span class="" data-uk-icon="phone"></span>
    </div>
    <div class="toolbar-stepper w-1/2">
        <div>
            <span class="uk-text-left" data-uk-icon="thumbnails"></span>
        </div>
		<div class="toolbar-tooltip" style="left: {left}px; display: {display};" >{hoverstep}</div>
        <input class="steps-slider w-full" type="range" bind:value={current} onmousemove={showHoverStep} onmouseout={hideHoverStep} onblur={hideHoverStep} min=1 max={total} aria-label="Range">
        <div style="display:inline-flex;">
            <button onclick={back} ><ChevronLeft /></button>
			<button onclick={forward} ><ChevronRight /></button>
        </div>
    </div>
    <div class="toolbar-item w-1/4 text-right">
        <span data-uk-icon="phone"></span>
    </div>
</div>

<style>
	.viewer{
		position:relative;
		height:100%;
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
	
	.viewer-toolbar{
		background:#222;
		color:#ddd;
		display:flex;
		width:100%;
        align-items: center;
		justify-content: center;
		position:relative;
		margin-top:auto;
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