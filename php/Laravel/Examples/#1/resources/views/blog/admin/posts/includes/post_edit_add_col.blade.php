<div class="row justify-content-center">
  <div class="col-md-12">
    <div class="card">
      <div class="card-body">
        <button type="submit" class="btn btn-primary">
          Сохранить
        </button>
      </div>
    </div>
  </div>
</div>

@if($item->exists)
  <br>
  <div class="row justify-content-center">
    <div class="col-md-12">
      <div class="card">
        <div class="card-body">
          <div class="form-group">
            <label for="_created_at">Создано</label>
            <input type="text" id="_created_at" value="{{ $item->created_at }}" class="form-control" disabled>
          </div>

          <div class="form-group">
            <label for="_updated_at">Изменено</label>
            <input type="text" id="_updated_at" value="{{ $item->updated_at }}" class="form-control" disabled>
          </div>

          <div class="form-group">
            <label for="_published_at">Опубликовано</label>
            <input type="text" id="_published_at" value="{{ $item->published_at }}" class="form-control" disabled>
          </div>
        </div>
      </div>
    </div>
  </div>
@endif
