@extends('layouts.app')

@section('content')
  @php /** @var \App\Models\BlogCategory $item */@endphp
  <form method="POST" action="{{ route('blog.admin.categories.update', $item->id) }}">
    @method('PATCH')
    @csrf
    <div class="container">
      @php
        /** @var \Illuminate\Support\ViewErrorBag $errors */
      @endphp

      @if($errors->any()) {{-- any() - не пуст --}}
        <div class="container">
          <div class="row justify-content-center">
            <div class="col md-11">
              <div class="alert alert-danger" role="alert">
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">
                  x
                </span>
                  {{ $errors->first() }}
                </button>
              </div>
            </div>
          </div>
        </div>
      @endif
    </div>

    @if(session('success'))

    @endif

    <div class="container">
      <div class="row justify-content-center">
        <div class="col md-8">
          @include('blog.admin.categories.includes.item_edit_main_col')
        </div>
        <div class="col md-4">
          @include('blog.admin.categories.includes.item_edit_add_col')
        </div>
      </div>
    </div>
  </form>
@endsection
