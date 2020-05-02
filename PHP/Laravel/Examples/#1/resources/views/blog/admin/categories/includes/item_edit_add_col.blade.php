@php
  /** @var \App\Models\BlogCategory $item */
@endphp

<div class="row justify-content-center">
  <div class="col-md-12">
    <div class="card">
      <ul class="nav nav-tabs" role="tablist">
        <li class="nav-item">
          <a class="nav-link active" data-toggle="tab" href="#maindata" role="tab">
            Основные данные
          </a>
        </li>
      </ul>

      <br>
      <div class="tab-content">
        <div class="tab-pane active" id="maindata" role="tabpanel">
          <div class="form-group">
            <label for="title">
              Заголовок
            </label>
            <input name="title" value="{{ $item->title }}"
                   id="title"
                   type="text"
                   class="form-control"
                   minlength="3"
                   required
            >
          </div>

          <div class="form-group">
            <label for="slug">Индентификатор</label>
            <input name="slug" value="{{ $item->slug }}"
                   id="slug"
                   type="text"
                   class="form-control"
            >
          </div>

          <div class="form-group">
            <label for="parent_id">Родитель</label>
            <select name="parent_id"
                    id="parent_id"
                    class="form-control"
                    required
            >
              @foreach($categoryList as $categoryOption)
                <option value="{{ $categoryOption->id }}"
                  @if($categoryOption->id == $item->paren_id) selected @endif
                >
                  {{ $categoryOption->id }}. {{ $categoryOption->title }}
                </option>
              @endforeach
            </select>
          </div>

          <div class="form_group">
            <label for="description">
              Описание
            </label>
            <textarea name="description" id="description" class="form-control" rows="3">
              {{ old('description', $item->description) }}
              <!-- old для withInput() -->
            </textarea>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
