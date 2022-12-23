<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;

class BlogPostAfterDeleteJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

  private $blogPostId;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($blogPostId)
    {
        $this->blogPostId = $blogPostId;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
      logs()->warning("Удалена запись в блоге [{$this->blogPostId}]");
      // /storage/logs/
    }
}
