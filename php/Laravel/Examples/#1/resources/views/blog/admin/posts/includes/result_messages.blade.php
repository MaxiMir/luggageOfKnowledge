@if($errors->any()) {{-- any() - не пуст --}}
<div class="row justify-content-center">
  <div class="col-md-11">
    <div class="alert alert-danger" role="alert">
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">
              x
            </span>
      </button>
      <ul>
        @foreach($errors->all() as $errorTxt)
          <li>{{ $errorTxt }}</li>
        @endforeach
      </ul>
    </div>
  </div>
</div>
@endif

@if(session('success')) {{-- session - сессия --}}
<div class="row justify-content-center">
  <div class="col-md-11">
    <div class="alert alert-success" role="alert">
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">
              x
            </span>
      </button>
      {{ session()->get('success') }}
    </div>
  </div>
</div>
@endif
