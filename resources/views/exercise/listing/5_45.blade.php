<p>{{ __('exercises/5_45.description.1') }}</p>
<p>{{ __('exercises/5_45.description.2') }}<a href="{{ route('exercises.show', App\Models\Exercise::findByPath('5.27')) }}">5.27</a>
{{ __('exercises/5_45.description.3') }}
<code>n</code>
{{ __('exercises/5_45.description.4') }}
<code>n!</code>
{{ __('exercises/5_45.description.5') }}
<a href="{{ route('exercises.show', App\Models\Exercise::findByPath('5.14')) }}">5.14</a>
{{ __('exercises/5_45.description.6') }}
<code>factorial</code>
{{ __('exercises/5_45.description.7') }}
</p>
<p>{{ __('exercises/5_45.description.8') }}
<code>n!</code>
{{ __('exercises/5_45.description.9') }}
<code>n</code>
{{ __('exercises/5_45.description.10') }}
<code>n</code>
{{ __('exercises/5_45.description.11') }}
</p>
<p>{{ __('exercises/5_45.description.12') }}</p>
<p>{{ __('exercises/5_45.description.13') }}</p>
<img class="img-fluid" src="{{ Vite::asset("resources/assets/images/exercises/5_45.gif") }}" alt="5.45">
<pre><code>(controller
   (assign continue (label fact-done))     ; set up final return address
 fact-loop
   (test (op =) (reg n) (const 1))
   (branch (label base-case))
   ;; Set up for the recursive call by saving n and continue.
   ;; Set up continue so that the computation will continue
   ;; at after-fact when the subroutine returns.
   (save continue)
   (save n)
   (assign n (op -) (reg n) (const 1))
   (assign continue (label after-fact))
   (goto (label fact-loop))
 after-fact
   (restore n)
   (restore continue)
   (assign val (op *) (reg n) (reg val))   ; val now contains n(n - 1)!
   (goto (reg continue))                   ; return to caller
 base-case
   (assign val (const 1))                  ; base case: 1! = 1
   (goto (reg continue))                   ; return to caller
 fact-done)
</code></pre>
<p>{{ __('exercises/5_45.description.14') }}</p>
