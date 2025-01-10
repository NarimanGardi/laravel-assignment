@extends('app')

@section('title', 'Product Form')

@section('header', 'Product Form')

@section('content')

    <div id="flash-messages"></div>
    @include('pages.products.create')

    <hr>
    <div id="product-table">

    </div>

    @include('pages.products.edit-modal')

@endsection
