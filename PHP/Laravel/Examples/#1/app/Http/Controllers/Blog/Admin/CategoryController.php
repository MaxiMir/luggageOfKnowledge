<?php

  namespace App\Http\Controllers\Blog\Admin;

  use App\Http\Requests\BlogCategoryCreateRequest;
  use App\Http\Requests\BlogCategoryUpdateRequest;
  use App\Models\BlogCategory;
  use App\Repositories\BlogCategoryRepository;
  use Illuminate\Support\Str;

  class CategoryController extends BaseController
  {
    /**
     * @var BlogCategoryRepository
     */
    private $blogCategoryRepository;

    public function __construct()
    {
      parent::__construct();

      $this->blogCategoryRepository = app(BlogCategoryRepository::class);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
      // $paginator = BlogCategory::paginate(5);
      $paginator = $this->blogCategoryRepository->getAllWithPaginate(5);

      return view('blog.admin.categories.index', compact('paginator'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
      $item = new BlogCategory(); // объект класса BlogCategory
      // $categoryList = BlogCategory::all();
      $categoryList = $this->blogCategoryRepository->getForComboBox();

      return view('blog.admin.categories.edit',
        compact('item', 'categoryList')
      );
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(BlogCategoryCreateRequest $request)
    {
      $data = $request->input(); // данные с формы

      $item = new BlogCategory($data);
      $item->save();

      if ($item) {
        return redirect()->route('blog.admin.categories.edit', [$item->id])
          ->with(['success' => 'Успешно сохранено']);
      }

      return back()->withErrors(['msg' => 'Ошибка сохранения'])
        ->withInput();
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param int $id
     * @param BlogCategoryRepository $categoryRepository
     * @return \Illuminate\Http\Response
     */
    public function edit($id, BlogCategoryRepository $categoryRepository)
    {
      /*
      $item = BlogCategory::find($id);
      $item = BlogCategory::findOfFail($id); // если не найдет -> 404
      $item = BlogCategory::where('id', '=', $id)->first(); // если не найдет -> 404
      $categoryList = BlogCategory::all();
      */

      $item = $categoryRepository->getEdit($id);

      if (empty($item)) {
        abort(404);
      }

      $categoryList = $categoryRepository->getForComboBox();

      return view('blog.admin.categories.edit', compact('item', 'categoryList'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param BlogCategoryUpdateRequest $request
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function update(BlogCategoryUpdateRequest $request, $id)
    {
      // заменил Request на BlogCategoryUpdateRequest в нем прописана валидация

      /*
      $rules = [
        'title' => 'required|min:5|max:200',
        'slug' => 'max:200',
        'description' => 'string|min:3|max:500',
        'parent_id' => 'required|integer|exists:blog_categories,id' // таблица blog_categories поле id
      ];

      ! ПЕРЕНЕСЕНО в /app/Http/Requests/BlogCategoryUpdateRequest.php

      $validatedData = $this->validate($request, $rules);
      // <->
      $validatedData = $request->validate($rules);
      // <->
      $validator = \Validator::make($request->all(), $rules);
      $validatedData[] = $validator->passes(); // выполнит проверку и -> true || false
      $validatedData[] = $validator->validate(); // выполнит проверку, если ошибка - сделает редирект
      $validatedData[] = $validator->valid(); // валидные данные
      $validatedData[] = $validator->failed(); // невалидные данные
      $validatedData[] = $validator->error(); // ошибки
      $validatedData[] = $validator->fails();
      */

      $item = $this->blogCategoryRepository->getEdit($id);

      if (empty($item)) {
        return back() // редирект назад
        ->withErrors(['msg' => "Запись id=[{$id}] не найдена"])
          ->withInput(); // вернуть с input с заполненными данными
      }

      $data = $request->all(); // ->input()

      $result = $item
        ->fill($data) // заполнение полей данными
        ->save(); // сохранение в БД
      // <->
      $result = $item->update($data);


      if ($result) {
        return redirect()
          ->route('blog.admin.categories.edit', $item->id)
          ->with(['success' => 'Успешно сохранено']);
      } else {
        return back()
          ->withErrors(['msg' => 'Ошибка сохранения'])
          ->withInput();
      }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
      //
    }
  }
